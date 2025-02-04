import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRoutes from './route/api.js'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1', apiRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
