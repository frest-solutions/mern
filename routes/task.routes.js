const {Router} = require('express')
const Task = require('../models/Task')
const User = require('../models/User')
const Service = require('../models/Service')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')

const TaskRoute = (io) => {
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
      await User.updateOne({_id: req.user.userId}, {$push: {tasks: task._id}})

      io.emit('task', task)
      io.emit('spectask', task)
      res.status(201).json({task})

    } catch (e) {
      res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })

  router.get('/', authMiddleware, async (req, res) => {

    try {
      const tasks = await Task.find({owner: req.user.userId})

      io.emit('tasks', tasks)
      res.json(tasks)

    } catch (e) {
      res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  })

  router.get('/spec', authMiddleware, async (req, res) => {

    try {
      const tasks = await Task.find({})

      io.emit('specTasks', tasks)
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

  router.delete('/:id', async (req, res) => {

    try {
      await Task.findOneAndDelete({_id: req.params.id})
      res.json({success: req.params.id})

    } catch (e) {
      res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }

  })

  return router;
}


module.exports = TaskRoute
