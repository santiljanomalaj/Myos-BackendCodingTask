// const { Router } = require('express')
import express, { Router } from 'express'
const productController = require('../controller')

const router = Router()

router.get('/search', productController.search)
router.get('/sort', productController.sort)
router.get('/getall', productController.getAll)

router.post('/order', productController.order)

module.exports = router