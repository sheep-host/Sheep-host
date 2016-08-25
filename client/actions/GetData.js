import axios from 'axios';



export function getUserData(id) {
	console.log('getData Action')
	return dispatch => {
		return axios.get('/api/' + id)
	}
}