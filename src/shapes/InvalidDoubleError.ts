export default class InvalidDoubleError extends Error {
  constructor(message?: string) {
    super(message || 'Value must be a valid number and cannot be infinite.');
  }
}
