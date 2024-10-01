import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="922464833372-15l5g62rsftj1ciiui18hm3iuub9u812.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<TodoList setUserGlobal={setUser} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;