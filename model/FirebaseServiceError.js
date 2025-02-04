export class FirebaseServiceError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}
