import axios from 'axios';
const Url = '/api/persons';

const getUser = () => {
  const request = axios.get(Url);
  return request.then(response => response.data);
};

const createUser = obj => {
  const request = axios.post(Url, obj);
  return request.then(response => response.data);
};

const deleteUser = id => {
  const request = axios.delete(`${Url}/${id}`);
  return request.then(response => response.data);
};

const updateUser = (id, obj) => {
  const request = axios.put(`${Url}/${id}`, obj);
  return request.then(response => response.data);
};

export default {getUser, createUser, deleteUser, updateUser};
