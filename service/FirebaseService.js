import { Lock } from '../model/Lock.js'
import db from '../utils/firebase.js'
import { FirebaseServiceError } from '../model/FirebaseServiceError.js'

export class FirebaseService {
  static async saveLoraData (body) {
    if (!body) {
      throw new FirebaseServiceError('LoRaWAN data is empty.', 400)
    }

    const decodedPayload = body?.uplink_message?.decoded_payload?.text
    if (!decodedPayload) {
      throw new FirebaseServiceError('Decoded payload is missing.', 400)
    }

    try {
      const decodedData = JSON.parse(decodedPayload)
      const [lat, long, uid, status] = decodedData.data.split('_')

      const latitude = parseFloat(lat)
      const longitude = parseFloat(long)

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new FirebaseServiceError(
          'Invalid latitude or longitude values.',
          400
        )
      }

      if (!uid) {
        throw new FirebaseServiceError('UID is missing.', 400)
      }

      const timestamp = Date.now()
      const lockData = new Lock(
        latitude,
        longitude,
        status === '0' ? false : true
      )

      // staus code 0 means unlocked, 1 means locked, 2 means open but without location
      if (status === '2') {
        await db.ref(`/locks/${uid}`).update({ locked: false })
      } else {
        await db.ref(`/locks/${uid}`).update(lockData)

        var lockRef = db.ref(`/locks/${uid}/history/${timestamp}`)
        await lockRef.set({
          timestamp,
          ...lockData
        })
      }

      return { message: 'Data saved successfully.' }
    } catch (e) {
      throw new FirebaseServiceError(
        `Error saving data to Firebase: ${e.message || 'Unknown error'}`,
        500
      )
    }
  }
}
