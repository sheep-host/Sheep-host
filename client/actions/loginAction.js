import axios from 'axios';

export function userLogin(userData) {
	return dispatch => {
		return axios.post('/login', userData)
	}
}