import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { getTodos, updateTodo, deleteTodo, addTodo } from '../services/todoService';
import TodoForm from './TodoForm';

function TodoList({ setUserGlobal }) {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserGlobal(parsedUser);
    }
  }, [setUserGlobal]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos(user.sub);
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleToggle = async (id) => {
    const updatedTodo = todos.find(todo => todo._id === id);
    updatedTodo.completed = !updatedTodo.completed;
    try {
      await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
      try {
        await deleteTodo(id, user.sub);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleAddOrUpdateTodo = async (todoData) => {
    if (editingTodo) {
      try {
        const updatedTodo = { ...editingTodo, ...todoData };
        const result = await updateTodo(editingTodo._id, updatedTodo);
        setTodos(todos.map(todo => todo._id === editingTodo._id ? result : todo));
        setEditingTodo(null);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      try {
        const newTodo = { ...todoData, completed: false, userId: user.sub };
        const addedTodo = await addTodo(newTodo);
        setTodos([...todos, addedTodo]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Decoded token:', decoded);
    setUser(decoded);
    setUserGlobal(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setUserGlobal(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="container mt-5">
      {user ? (
        <>
          <h1 className="text-center mb-4">Danh sách công việc</h1>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span>Xin chào, {user.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">Đăng xuất</button>
          </div>
          <TodoForm
            onSubmit={handleAddOrUpdateTodo}
            initialTodo={editingTodo}
            onCancel={() => setEditingTodo(null)}
          />
          <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-bordered table-striped text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Tiêu đề</th>
                  <th>Thời gian tạo</th>
                  <th>Hoàn thành</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <tr key={todo._id}>
                    <td>{todo.title}</td>
                    <td>{new Date(todo.createdAt).toLocaleString()}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo._id)}
                      />
                    </td>
                    <td>
                      <button className="btn btn-warning" onClick={() => setEditingTodo(todo)}>
                        Sửa
                      </button>
                      <button className="btn btn-danger ms-2" onClick={() => handleDelete(todo._id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1>Welcome to Todo App</h1>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;