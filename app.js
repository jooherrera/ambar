import express from 'express'
import { router } from './src/routes/products.js'

const app = express()

app.use(router)

app.listen(8080, () => {
  console.log('Server on PORT 8080')
})
