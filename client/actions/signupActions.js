import axios from 'axios';

export default function userSignupRequest(data) {
  return () => axios.post('/signup', data);
}
