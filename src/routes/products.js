import { Router } from 'express'
import { cliNotice } from '../libs/index.js'
import { Container } from '../components/Container.js'

const db = new Container('/utils/products.json')

const router = Router()

//TODO: Return all products
router.get('/', async (req, res) => {
  cliNotice('Server request received...')
  const products = await db.getAll()
  res.status(200).json(products)
})

router.get('/:id', (req, res) => {
  cliNotice('Server request received...')
  //TODO: Return product by id, if product does not exist return {error: "Product not found"}
})

router.post('/', (req, res) => {
  cliNotice('Server request received...')
  //TODO: Add product from form and returns id
})

router.put('/:id', (req, res) => {
  cliNotice('Server request received...')
  //TODO: Receive and update a product from id, if product does not exist return {error: "Product not found"}
})

router.delete('/:id', (req, res) => {
  cliNotice('Server request received...')
  //TODO: Receive and update a product from id, if product does not exist return {error: "Product not found"}
})

export { router }
