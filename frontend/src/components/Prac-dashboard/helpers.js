import axios from 'axios';
export const getPatients = () => {
  return axios.get('/api/patients').then((res) => res.data);
};
