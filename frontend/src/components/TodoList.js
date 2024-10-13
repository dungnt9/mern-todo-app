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

  useEffect(() => {       //lấy người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserGlobal(parsedUser);
    }
  }, [setUserGlobal]);

  useEffect(() => {   //nếu user thay đổi, gọi fetchTodos để lấy danh sách công việc.
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos(user.sub); //thuộc tính sub của đối tượng user, là định danh duy nhất của người dùng từ Google OAuth
    setTodos(fetchedTodos);
  };

  const handleToggle = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id); //tìm công việc có ID khớp với id mà user nhấn vào
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    await updateTodo(id, updatedTodo);
    setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo)); //phương thức map tạo mảng mới dựa trên mảng todos hiện tại
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
      await deleteTodo(id, user.sub);
      setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  const handleAddOrUpdateTodo = async (todoData) => {
    if (editingTodo) {
      const updatedTodo = { ...editingTodo, ...todoData };  //todoData sẽ ghi đè editingTodo (gốc)
      const result = await updateTodo(editingTodo._id, updatedTodo);
      setTodos(todos.map(todo => todo._id === editingTodo._id ? result : todo)); //tạo một mảng mới, cập nhật công việc có _id tìm được
      setEditingTodo(null);
    } else {
      const newTodo = { ...todoData, completed: false, userId: user.sub };
      const addedTodo = await addTodo(newTodo); //gọi API và gán vào biến addedTodo
      setTodos([...todos, addedTodo]);  //Spread operator (...todos) để giữ nguyên các công việc cũ trong danh sách, sau đó thêm công việc mới vào mảng.
    }
  };

  //Xử lý sự kiện khi user đăng nhập thành công bằng Google OAuth, tham số: mã định danh user
  const handleGoogleLoginSuccess = (credentialResponse) => {  
    // hàm giải mã, credential chứa JWT (JSON Web Token_thông tin người dùng đã được mã hóa) mà Google cung cấp sau khi đăng nhập thành công
    const decoded = jwtDecode(credentialResponse.credential); 
    setUser(decoded);        //cập nhật trạng thái user
    setUserGlobal(decoded);  //cập nhật thông tin người dùng toàn cục
    localStorage.setItem('user', JSON.stringify(decoded)); //lưu thông tin người dùng vào localStorage (key, value chuỗi JSON)
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
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;