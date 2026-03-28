import React, { useState } from "react";
import "./Registruj.css";
import { useNavigate } from "react-router-dom";
function Registruj() {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Forma poslata!");
    };
    const handleClose = () => {
        navigate("/");
    };
    return (
        <form className="registracija" onSubmit={handleSubmit}>
            <h2>Registracija</h2>
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
            <button type="button" className="btn-zatvori" onClick={handleClose}>Zatvori</button>
        </form>
    );

}
export default Registruj;
