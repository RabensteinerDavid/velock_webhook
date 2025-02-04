import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { readFile } from 'fs/promises'

dotenv.config()

let serviceAccount

try {
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  const fileContent = await readFile(filePath, 'utf8')
  serviceAccount = JSON.parse(fileContent)
} catch (error) {
  console.error('Error loading Firebase service account key:', error.message)
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

const db = admin.database()
export default db
