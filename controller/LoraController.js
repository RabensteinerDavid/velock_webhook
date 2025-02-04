import dotenv from 'dotenv'
import { FirebaseService } from '../service/FirebaseService.js'
import { FirebaseServiceError } from '../model/FirebaseServiceError.js'

dotenv.config()

export class LoraController {
  static async webhook (req, res) {
    try {
      const result = await FirebaseService.saveLoraData(req.body)
      res.status(201).json(result)
    } catch (error) {
      if (error instanceof FirebaseServiceError) {
        return res.status(error.statusCode).json({ error: error.message })
      }
      console.error('Unexpected error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default LoraController
