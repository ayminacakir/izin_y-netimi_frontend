// App.js
import React from "react";
import "./App.css";
import IzinTaleplerim from "./components/IzinTaleplerim";
import LoginPage from "./components/LoginPage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
