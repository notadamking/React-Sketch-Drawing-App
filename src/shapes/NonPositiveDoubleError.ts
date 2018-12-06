import InvalidDoubleError from './InvalidDoubleError';

export default class NonPositiveDoubleError extends InvalidDoubleError {
  constructor(message?: string) {
    super(message || 'Value cannot be negative.');
  }
}
