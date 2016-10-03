import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateCreateDBInput = (data) => {
  const errors = {};
  if (Validator.isNull(data.dbName)) {
    errors.dbName = 'Database field is required';
  }
  if (Validator.isNull(data.collectionName)) {
    errors.collectionName = 'Collection field is required';
  }
  if (Validator.isNull(data.schema)) {
    errors.schema = 'Schema field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateCreateDBInput;
