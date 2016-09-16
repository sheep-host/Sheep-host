import axios from 'axios';

export default function userLogin(userData) {
  return () => axios.post('/login', userData);
}
