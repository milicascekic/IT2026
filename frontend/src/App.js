import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Katalog from "./pages/Katalog";
import Parfemi from "./pages/Parfemi";
import Login from "./pages/Login";
import Registruj from "./pages/Registruj";
import Add from "./pages/Add";
import AdminDashboard from "./pages/AdminDashboard";

import { AuthProvider, AuthContext } from "./components/AuthContext";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parfemi" element={<Katalog />} />
        <Route path="/parfem/:id" element={<Parfemi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registruj />} />

        <Route
          path="/add"
          element={user && user.role === 'ADMIN' ? <Add /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={
            user && user.role === 'ADMIN'
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;