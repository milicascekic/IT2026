import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Katalog.css";

const Katalog = () => {
    const [parfemi, setParfemi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/api/parfemi')
            .then(res => {
                setParfemi(res.data);
            })
            .catch(err => {
                console.error("Greška pri dobavljanju podataka:", err);
            });
    }, []);


    

    return (
        <div className="katalog-container">
            <h1 className="katalog-title">Katalog Parfema</h1>
            <div className="perfume-grid">
                {parfemi.map((parfem) => (
                    <div
                        key={parfem.id}
                        className="perfume-card"
                        onClick={() => navigate(`/parfem/${parfem.id}`)}
                    >
                        <div className="card-image">
                            <img
                                src={`/images/${parfem.slika_dp}`}
                                alt={parfem.naziv_originala}
                            />
                        </div>
                        <div className="card-info">
                            <h3>{parfem.naziv_originala}</h3>
                            <p>{parfem.brend_originala}</p>
                            <div className="learn-more-box">
                                <span className="heart-icon">❤</span>
                                <span>Klikni da saznaš više o meni</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Katalog;