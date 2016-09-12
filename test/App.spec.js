/* eslint-env mocha */
const { expect } = require('chai')
const React = require('react')
const  shallow  = require('enzyme').shallow
const LoginForm = require('../client/components/login/LoginForm')
const LoginInput = require('../client/components/login/LoginInput')



describe('LoginForm />', () => {
	it('should render div', () => {
		const wrapper = shallow(<LoginForm />)
		console.log(wrapper)
		expect(wrapper.contains(<div></div>)).to.be.true
	})
})