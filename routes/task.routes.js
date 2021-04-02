const {Router} = require('express')
const Task = require('../models/Task')
const Service = require('../models/Service')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')


router.post('/create', authMiddleware, async (req, res) => {

  try {
    const {title, description, price, phone, address, serviceId} = req.body

    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(404).json({message: 'Сервис не найден, попробуйте ещё раз'})
    }

    const task = new Task({
      title, description, price, phone, address,
      serviceId: service._id,
      owner: req.user.userId
    })

    await task.save()
    res.status(201).json({task})

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', authMiddleware, async (req, res) => {

  try {
    const tasks = await Task.find({owner: req.user.userId})

    res.json(tasks)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', authMiddleware, async (req, res) => {

  try {
    const task = await Task.findById(req.params.id)
    res.json(task)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router
