import axios from 'axios';

export function userSignupRequest(data) {
	return dispatch => {
		return axios.post('/signup', data)
	}
}