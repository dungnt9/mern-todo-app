import React, { useState, useEffect } from 'react';
import { getTodos, updateTodo, deleteTodo, addTodo } from '../services/todoService';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(''); // Cập nhật biến trạng thái
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const handleToggle = async (id) => {
    const updatedTodo = todos.find(todo => todo._id === id);
    updatedTodo.completed = !updatedTodo.completed;
    await updateTodo(id, updatedTodo);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')) { // Xác nhận trước khi xóa
      try {
        await deleteTodo(id);
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error); // Log lỗi
      }
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      await addTodo({ title, completed: false, createdAt: selectedDateTime });
      setTitle('');
      setSelectedDateTime(''); // Đặt lại biến trạng thái
      fetchTodos();
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setSelectedDateTime(new Date(todo.createdAt).toISOString().substring(0, 16)); // Cập nhật để bao gồm giờ và phút
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (editingTodo && title.trim()) {
      const updatedTodo = { ...editingTodo, title, createdAt: selectedDateTime }; // Sử dụng selectedDateTime
      await updateTodo(editingTodo._id, updatedTodo);
      setEditingTodo(null);
      setTitle('');
      setSelectedDateTime(''); // Đặt lại biến trạng thái
      fetchTodos();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Danh Sách Công Việc</h1>
      <form onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề công việc"
          className="form-control mb-2"
        />
        <input
          type="datetime-local" // Thay đổi kiểu nhập
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)} // Cập nhật biến trạng thái
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Cập nhật' : 'Thêm Công Việc'}
        </button>
        {editingTodo && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingTodo(null)}>
            Hủy
          </button>
        )}
      </form>
      <div className="table-responsive">
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
                  <button className="btn btn-warning" onClick={() => handleEditTodo(todo)}>
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
    </div>
  );
}

export default TodoList;
