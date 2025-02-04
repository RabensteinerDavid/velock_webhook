import express from 'express'
import LoraController from './../controller/LoraController.js'

const router = express.Router()

router.post('/lora-data', async (req, res, next) => {
  LoraController.webhook(req, res)
})

export default router
