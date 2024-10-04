//C:\Users\dung9\Desktop\mern-todo-app\frontend\src\services\todoService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async (userId) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id, userId) => {
  return await axios.delete(`${API_URL}/${id}?userId=${userId}`);
};