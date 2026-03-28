import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Parfemi from "./pages/Parfemi";
import Login from "./pages/Login";
import Registruj from "./pages/Registruj";
import Add from "./pages/Add";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parfemi" element={<Parfemi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registruj/>}/>
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
