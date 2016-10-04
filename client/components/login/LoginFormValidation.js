import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateLoginInput = (data) => {
  const errors = {};

  if (Validator.isNull(data.userName)) {
    errors.userName = 'Username field is required';
  }
  if (Validator.isNull(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateLoginInput;
