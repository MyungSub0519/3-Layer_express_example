export class ValidationError extends Error {
  constructor() {
    super()
    this.name = 'ValidationError'
    this.message = 'Undefined essential elements in request field.'
  }
}
