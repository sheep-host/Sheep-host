import axios from 'axios';



export function userLogin(userData) {
	console.log('userLogin Action')
	return dispatch => {
		return axios.post('/api/checkUserLogin', userData)
	}
}