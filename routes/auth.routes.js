const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Role = require('../models/Role')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов')
      .isLength({min: 8}),
    check('role', 'Не указан роль пользователя').exists()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const {email, password, role} = req.body

      const candidate = await User.findOne({email})

      if (candidate) {
        return res.status(400)
          .json({message: 'Такой пользователь уже существует'})
      }

      const userRole = await Role.findOne({value: role})
      const hashedPassword = await bcrypt.hash(password, 12)

      if (userRole.value === 'SPECIALIST') {
        const user = new User({
          email,
          role: userRole.value,
          password: hashedPassword,
          paidUntil: Date.now() + 1.728e+8 //48hours
        })

        await user.save()
        res.status(201).json({message: 'Пользователь создан'})
        return
      }

      const user = new User({
        email,
        role: userRole.value,
        password: hashedPassword
      })

      await user.save()
      res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
      console.log(e)
      res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Введите корректный email')
      .isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})
      // await User.updateOne({_id: user._id}, {$set: {lastSeen: Date.now()}})

      if (!user) {
        return res.status(400).json({
          message: 'Пользователь не найден'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Неверный логин или пароль, попробуйте снова'})
      }

      const token = jwt.sign(
        {userId: user.id, role: user.role},
        config.get('jwtSecret'),
        {expiresIn: '24h'}
      )

      res.json({token, userId: user.id, role: user.role})

    } catch (e) {
      res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }

  }
)

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(400).json({
        message: 'Пользователь не найден'
      })
    }
    // await User.updateOne({_id: user._id}, {$set: {lastSeen: Date.now()}})
    res.json(user)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) {
      return res.status(400).json({
        message: 'Пользователи не найдены'
      })
    }

    res.json(users)
  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


module.exports = router
