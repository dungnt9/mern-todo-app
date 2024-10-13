import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { getTodos, updateTodo, deleteTodo, addTodo } from '../services/todoService';
import TodoForm from './TodoForm';
import './TodoList.css';

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
      // Handle error silently or show a user-friendly message
    }
  };

  const handleToggle = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    try {
      await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      // Handle error silently or show a user-friendly message
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
      try {
        await deleteTodo(id, user.sub);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (error) {
        // Handle error silently or show a user-friendly message
      }
    }
  };

  const handleAddOrUpdateTodo = async (todoData) => {
    try {
      if (editingTodo) {
        const updatedTodo = { ...editingTodo, ...todoData };
        const result = await updateTodo(editingTodo._id, updatedTodo);
        setTodos(todos.map(todo => todo._id === editingTodo._id ? result : todo));
        setEditingTodo(null);
      } else {
        const newTodo = { ...todoData, completed: false, userId: user.sub };
        const addedTodo = await addTodo(newTodo);
        setTodos([...todos, addedTodo]);
      }
    } catch (error) {
      // Handle error silently or show a user-friendly message
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
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
    <div className="todo-container">
      {user ? (
        <>
          <div className="todo-header">
            <h3>Danh sách công việc</h3>
            <div className="user-info">
              <span>Xin chào, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
            </div>
          </div>
          <TodoForm
            onSubmit={handleAddOrUpdateTodo}
            initialTodo={editingTodo}
            onCancel={() => setEditingTodo(null)}
          />
          <div className="table-container">
            <table className="todo-table">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Thời gian làm việc</th>
                  <th>Hoàn thành</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <tr key={todo._id}>
                    <td>{todo.title}</td>
                    <td>{new Date(todo.workTime).toLocaleString()}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo._id)}
                      />
                    </td>
                    <td>
                      <div className="todo-actions">
                        <button className="btn-edit" onClick={() => setEditingTodo(todo)}>
                          Sửa
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(todo._id)}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="login-container">
          <h1 style={{textAlign:'center', color:'green'}}>Welcome to Todo App</h1>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {/* Handle error silently */}}
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;