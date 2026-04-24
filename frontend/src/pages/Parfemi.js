import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Parfemi.css";

const Parfemi = () => {
    const { id } = useParams();
    const [parfem, setParfem] = useState(null);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/parfemi/${id}`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setParfem(data);
            })
            .catch(err => console.error("Greška pri učitavanju parfema:", err));
    }, [id]);

    const renderSezonaIcons = (sezonaString) => {
        if (!sezonaString) return null;
        const sezone = sezonaString.split(',').map(s => s.trim().toLowerCase());
        const mape = {
            zima: '❄️',
            jesen: '🍂',
            proljeće: '🌸',
            proleće: '🌸',
            ljeto: '☀️',
            leto: '☀️'
        };
        return sezone.map((s, index) => (
            <span key={index} title={s} style={{ marginRight: '8px', fontSize: '1.2rem' }}>
                {mape[s] || s}
            </span>
        ));
    };

    const renderPolIcon = (polString) => {
        if (!polString) return null;
        const pol = polString.trim().toLowerCase();
        const mape = {
            zenski: '♀️',
            ženski: '♀️',
            muski: '♂️',
            muški: '♂️',
            unisex: '⚧'
        };
        return (
            <span style={{ fontSize: '1.2rem', marginLeft: '5px' }} title={polString}>
                {mape[pol] || pol}
            </span>
        );
    };

    const renderIntenzitetLabel = (nivo) => {
        const mape = { 1: "Lagan", 2: "Umjeren", 3: "Jak" };
        const barovi = { 1: "▂  ", 2: "▂ ▅ ", 3: "▂ ▅ █" };
        return (
            <span style={{ fontWeight: 'bold', color: '#c5a059' }}>
                <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>{barovi[nivo]}</span>
                {mape[nivo] || nivo}
            </span>
        );
    };

    if (!parfem) return <div className="loading" style={{ color: '#c5a059', textAlign: 'center', marginTop: '50px' }}>Učitavanje detalja...</div>;

    return (
        <div className="parfemi-container">
            <div className="detalji-okvir">
                <p><strong>D&P Šifra:</strong> {parfem.sifra_dp}</p>
                <p><strong>Originalno ime:</strong> {parfem.naziv_originala}</p>
                <p><strong>Originalna kompanija:</strong> {parfem.brend_originala}</p>

                <div className="bottles">
                    <div className="bottle">
                        <p><strong>Originalna bočica:</strong></p>
                        <img
                            src={`/images/${parfem.slika_original}`}
                            alt="Original"
                            onClick={() => setModalImage(`/images/${parfem.slika_original}`)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="bottle">
                        <p><strong>Naša bočica:</strong></p>
                        <img
                            src={`/images/${parfem.slika_dp}`}
                            alt="D&P"
                            onClick={() => setModalImage(`/images/${parfem.slika_dp}`)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <div className="opis-kontejner">
                    <p><strong>Opis:</strong> {parfem.opis}</p>
                </div>

                <div className="perfume-info-row" style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <p>
                        <strong>Pol:</strong>
                        {renderPolIcon(parfem.pol)}
                    </p>
                    <p>
                        <strong>Sezona:</strong>
                        {renderSezonaIcons(parfem.sezona)}
                    </p>
                    <p>
                        <strong>Intenzitet:</strong>
                        <span style={{ marginLeft: '10px' }}>
                            {renderIntenzitetLabel(parfem.intenzitet_nivo)}
                        </span>
                    </p>
                </div>

                <div className="notes-container">
                    <div className="note-card">
                        <h3>Gornje note</h3>
                        <p>{parfem.gornje_note}</p>
                    </div>
                    <div className="note-card">
                        <h3>Srednje note</h3>
                        <p>{parfem.srednje_note}</p>
                    </div>
                    <div className="note-card">
                        <h3>Bazne note</h3>
                        <p>{parfem.bazne_note}</p>
                    </div>
                </div>
            </div>

            {modalImage && (
                <div className="image-modal" onClick={() => setModalImage(null)}>
                    <img
                        src={modalImage}
                        alt="Uvećano"
                        style={{ maxWidth: '90%', maxHeight: '90%' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default Parfemi;