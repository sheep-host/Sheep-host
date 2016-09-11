import axios from 'axios';

export function getUserData(id) {
	return dispatch => {
		return axios.get('/api/' + id)
	}
}