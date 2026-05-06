import React, { useState, useContext } from "react"; // 1. Dodali smo useContext
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/api/login", {
            email: email,
            password: lozinka
        })
            .then((res) => {
                login(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert("Pogrešan email ili lozinka");
            });
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
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>LOZINKA:</label>
            <input
                type="password"
                placeholder="Unesite lozinku..."
                required
                value={lozinka}
                onChange={(e) => setLozinka(e.target.value)}
            />

            <button type="submit">Prijavi se</button>
            <button
                type="button"
                className="btn-zatvori"
                onClick={handleClose}
            >
                Zatvori
            </button>
        </form>
    );
}

export default Login;