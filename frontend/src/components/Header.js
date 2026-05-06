import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    console.log("Podaci o korisniku:", user);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-container">
                <nav className="navigacion">
                    <Link to="/">POČETNA</Link>
                    <Link to="/parfemi">PARFEMI</Link>

                    
                    {user && user.role === 'ADMIN' && (
                        <Link to="/admin" className="admin-nav-link">
                            ADMIN
                        </Link>
                    )}
                </nav>

                <div className="nav-button">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className="white-btn">PRIJAVI SE</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn">REGISTRUJ SE</button>
                            </Link>
                        </>
                    ) : (
                        <div className="user-section">
                            <button className="btn" onClick={handleLogout}>
                                ODJAVI SE
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;