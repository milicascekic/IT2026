import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email,setEmail]=useState("");
    const [lozinka,setLozinka]=useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Kliknuo si prijavu!");
    };
    const handleClose = () => {
        navigate("/");
    };
    return (
        <form className="login" onSubmit={handleSubmit}>
      <h2>PRIJAVA</h2>
      <label>EMAIL:</label>
      <input
        type="email"
        placeholder="Unesite email..."
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <label>LOZINKA:</label>
        <input
           type="password"
           placeholder="Unesite lozinku..."
           required
           value={lozinka}
           onChange={(e)=>setLozinka(e.target.value)}
        />

        <button type="submit">Prijavi se</button>
        <button type="button" className="btn-zatvori" onClick={handleClose}>Zatvori</button>
    </form>
    );
      
}

export default Login;