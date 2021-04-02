const {Router} = require('express')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')
const Service = require('../models/Service')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')

router.post('/service/create', authMiddleware, async (req, res) => {
  try {
    const {title} = req.body
    const service = new Service({
      title
    })
    await service.save()
    res.status(201).json({service})
  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/service', authMiddleware, async (req, res) => {
  try {
    const service = await Service.find({})
    res.json(service)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/service/:id', authMiddleware, async (req, res) => {
  console.log(req.params)
  try {
    console.log(req.params.id)
    const service = await Service.findById(req.params.id)
    console.log(service)

    // const subCategory = await SubCategory.findById(service.subCategoryId)
    // const category = await Category.findById(subCategory.categoryId)
    res.json(service)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})


router.get('/', async (req, res) => {

  try {
    const category = await Category.find({})
    res.json(category)

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', async (req, res) => {

  try {
    const category = await Category.findById(req.params.id)
    const subcategories = await SubCategory.find({'categoryId': category._id})
    const subcategoriesId = subcategories.map(o => o._id)
    const services = await Service.find({'subCategoryId': subcategoriesId})
    res.json({category, subcategories, services})

  } catch (e) {
    res.status(500)
      .json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router
