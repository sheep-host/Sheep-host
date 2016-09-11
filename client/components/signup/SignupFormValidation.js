import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateSignupInputForm = (data) => {
	let errors = {};

	if(Validator.isNull(data.userName)) {
		errors.userName = 'Username field is required'
	}
	if(Validator.isNull(data.password)) {
	errors.password = 'Password field is required'
	}
	if(Validator.isNull(data.email)) {
		errors.email = "Email field is required"
	}
	if(!Validator.isEmail(data.email)) {
		errors.email = "Please enter valid email address"
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}

export default ValidateSignupInputForm;