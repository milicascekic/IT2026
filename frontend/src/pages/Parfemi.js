import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Parfemi = () => {
    const [parfemi, setParfemi] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/parfemi') 
            .then(res => setParfemi(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="parfemi-container">
            <h1>Katalog Parfema</h1>
            {parfemi.map((parfem) => (
                <div key={parfem.id}>
                    <p>D&P Šifra: {parfem.sifra_dp}</p>
                    <h3>Originalno ime:{parfem.naziv_originala}</h3>
                    <p>Originalna kompanija: {parfem.brend_originala}</p>

                    <p>Prikaz originalne bočice parfema:</p>
                    <img src={`/images/${parfem.slika_original}`} alt="Original" width="100" />

                    <p>Prikaz naše bočice:</p>
                    <img src={`/images/${parfem.slika_dp}`} alt="D&P" width="100" />
                    <p>Opis: {parfem.opis}</p>
                    <p>Pol: {parfem.pol}</p>
                    <p>Sezona: {parfem.sezona}</p>
                    <p>Intenzitet: {parfem.intenzitet_nivo}</p>
                    <p>Gornje note: {parfem.gornje_note}</p>
                    <p>Srednje note: {parfem.srednje_note}</p>
                    <p>Bazne note: {parfem.bazne_note}</p>

                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Parfemi;