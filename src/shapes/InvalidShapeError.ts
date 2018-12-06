export default class InvalidShapeError extends Error {
  constructor(message?: string) {
    super(message || 'Shape is invalid.');
  }
}
