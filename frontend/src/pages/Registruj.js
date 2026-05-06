import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registruj.css";

function Registruj() {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/api/register", {
            ime: ime,
            prezime: prezime,
            email: email,
            password: lozinka
        })
            .then(() => {
                alert("Registracija uspješna");
                navigate("/login");
            })
            .catch(() => {
                alert("Greška – email možda već postoji");
            });
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <form className="registracija" onSubmit={handleSubmit}>
            <h2>REGISTRACIJA</h2>

            <label>IME:</label>
            <input
                type="text"
                placeholder="Unesite ime..."
                required
                value={ime}
                onChange={(e) => setIme(e.target.value)}
            />

            <label>PREZIME:</label>
            <input
                type="text"
                placeholder="Unesite prezime..."
                required
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
            />

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

            <button type="submit">Registruj se</button>
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

export default Registruj;