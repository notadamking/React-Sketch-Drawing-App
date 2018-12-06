import InvalidDoubleError from "./InvalidDoubleError";
import NonPositiveDoubleError from "./NonPositiveDoubleError";

class Validator {
  public static validateDouble(value: number, message?: string) {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      throw new InvalidDoubleError(message);
    }
  }

  public static validatePositiveDouble(value: number, message?: string) {
    Validator.validateDouble(value, message);

    if (value <= 0) {
      throw new NonPositiveDoubleError(message);
    }
  }
}

export default Validator;
