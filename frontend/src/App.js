import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLoginButton from './components/GoogleLoginButton'; // Đường dẫn đến file mới tạo


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <GoogleLoginButton />
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
