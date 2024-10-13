import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, initialTodo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      const date = new Date(initialTodo.workTime);
      const formattedDate = date.toISOString().slice(0, 16);//Lấy 16 ký tự đầu từ chuỗi ISO để giữ lại phần YYYY-MM-DDTHH:MM
      setSelectedDateTime(formattedDate);
    } else {
      setTitle('');
      setSelectedDateTime('');
    }
  }, [initialTodo]);   //Mảng phụ thuộc-thực thi useEffect khi initialTodo thay đổi

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {     //loại khoảng trắng thừa
      onSubmit({ title, workTime: selectedDateTime });
      setTitle('');
      setSelectedDateTime('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setSelectedDateTime('');
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập tiêu đề công việc"
        className="form-control mb-2"
      />
      <input
        type="datetime-local"
        value={selectedDateTime}
        onChange={(e) => setSelectedDateTime(e.target.value)}
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">
        {initialTodo ? 'Cập nhật' : 'Thêm Công Việc'}
      </button>
      {initialTodo && (
        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
          Hủy
        </button>
      )}
    </form>
  );
};

export default TodoForm;