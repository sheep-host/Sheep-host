import axios from 'axios';

export default function getUserData(id) {
  return () => axios.get(`/api/ + ${id}`);
}
