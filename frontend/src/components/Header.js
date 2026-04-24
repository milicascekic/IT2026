import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <nav className="navigacion">
                    <Link to="/">POČETNA</Link>
                    <Link to="/parfemi">PARFEMI</Link>
                    <Link to="/add">DODAJ</Link>
                </nav>

                <div className="nav-button">
                    <Link to="/login">
                        <button className="white-btn">PRIJAVI SE</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn">REGISTRUJ SE</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;