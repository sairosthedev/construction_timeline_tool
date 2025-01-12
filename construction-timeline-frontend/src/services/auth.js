import axios from '../utils/axios';

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await axios.get('/auth/user');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const loginUser = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem('token');
};