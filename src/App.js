import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import Login from './components/Auth/Login';
import { AuthProvider } from './components/Auth/AuthContext'; 

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/TodoList" element={<TodoList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
