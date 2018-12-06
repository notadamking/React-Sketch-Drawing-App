import Validator from '../Validator';

test('ValidateDouble', () => {
  Validator.validateDouble(123);
  Validator.validateDouble(0.00123);
  Validator.validateDouble(-123);
  Validator.validateDouble(-0.00123);

  try {
    Validator.validateDouble(Infinity, 'Invalid');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Invalid');
  }

  try {
    Validator.validateDouble(-Infinity, 'Invalid');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Invalid');
  }

  try {
    Validator.validateDouble(NaN, 'Invalid');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Invalid');
  }
});

test('ValidatePositiveDouble', () => {
  Validator.validatePositiveDouble(456);
  Validator.validatePositiveDouble(0.34523);

  try {
    Validator.validatePositiveDouble(0, 'Zero is not positive');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Zero is not positive');
  }

  try {
    Validator.validatePositiveDouble(-123, 'Negative not allowed');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Negative not allowed');
  }

  try {
    Validator.validatePositiveDouble(-0.123, 'Negative not allowed');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Negative not allowed');
  }

  try {
    Validator.validateDouble(-Infinity, 'Invalid');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Invalid');
  }

  try {
    Validator.validateDouble(NaN, 'Invalid');

    fail('Expected exception not thrown');
  } catch (err) {
    expect(err.message).toEqual('Invalid');
  }
});
