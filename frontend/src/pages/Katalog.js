import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Katalog.css";

const Katalog = () => {
    const [parfemi, setParfemi] = useState([]);
    const [prikaziPanel, setPrikaziPanel] = useState(false);
    const navigate = useNavigate();

    
    const prazniFilteri = {
        pretraga: '',
        sezona: [],
        mirisna_grupa: [],
        intenzitet: [],
        pol: []
    };

    const [filteri, setFilteri] = useState(prazniFilteri);
    const [aktivniFilteri, setAktivniFilteri] = useState(prazniFilteri);

    
    const handleTogglePanel = () => {
        if (!prikaziPanel) {
            setFilteri(prazniFilteri);
        }
        setPrikaziPanel(!prikaziPanel);
    };

    const fetchParfemi = (parametri) => {
        const params = new URLSearchParams();

        if (parametri.pretraga) params.append('pretraga', parametri.pretraga);
        if (parametri.sezona?.length) params.append('sezona', parametri.sezona.join(','));
        if (parametri.mirisna_grupa?.length) params.append('mirisna_grupa', parametri.mirisna_grupa.join(','));
        if (parametri.intenzitet?.length) params.append('intenzitet', parametri.intenzitet.join(','));
        if (parametri.pol?.length) params.append('pol', parametri.pol.join(','));

        axios.get(`http://localhost:3001/api/parfemi?${params.toString()}`)
            .then(res => setParfemi(res.data))
            .catch(err => console.error("Greška pri dobavljanju podataka:", err));
    };

    useEffect(() => {
        fetchParfemi(aktivniFilteri);
    }, [aktivniFilteri]);

    const toggleFilter = (kategorija, vrijednost) => {
        setFilteri(prev => {
            let trenutniNiz = [...prev[kategorija]];
            if (trenutniNiz.includes(vrijednost)) {
                trenutniNiz = trenutniNiz.filter(v => v !== vrijednost);
            } else {
                trenutniNiz.push(vrijednost);
            }
            return { ...prev, [kategorija]: trenutniNiz };
        });
    };

    const handlePrimijeniFiltere = () => {
        setAktivniFilteri(filteri);
        setPrikaziPanel(false);
    };

    const handleOtkazi = () => {
        setFilteri(prazniFilteri);
        setAktivniFilteri(prazniFilteri);
        setPrikaziPanel(false);
    };

    return (
        <div className="katalog-container">
            <h1 className="katalog-title">Katalog Parfema</h1>

            <div className="search-trigger-wrapper">
                <button className="main-search-btn" onClick={handleTogglePanel}>
                    <span className="search-icon">🔍</span> PRETRAGA
                </button>
            </div>

            {prikaziPanel && (
                <div className="placeholder-panel">
                    <div className="search-input-section">
                        <p className="filter-naslov">BRZA PRETRAGA:</p>
                        <input
                            type="text"
                            autoComplete="off" 
                            placeholder="npr. unesite brend (Armani),naziv (My Way) ili D&P šifru (A-24) i označite pol..."
                            className="modern-search-input-field"
                            value={filteri.pretraga}
                            onChange={(e) => setFilteri({ ...filteri, pretraga: e.target.value })}
                        />
                    </div>

                    <div className="search-divider">
                        <span>ILI</span>
                    </div>

                    <div className="recommendation-header">
                        <p className="recommendation-main-title">NAŠA PREPORUKA</p>
                        <p className="recommendation-subtitle">Izaberite opcije ispod za precizniju pretragu:</p>
                    </div>

                    <div className="panel-content">
                        
                        <div className="filter-kolona">
                            <p className="filter-naslov">SEZONA:</p>
                            <div className="checkbox-grupa-vertical">
                                {['Zima', 'Proljeće', 'Ljeto', 'Jesen'].map((s) => (
                                    <label key={s} className="custom-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="real-checkbox"
                                            checked={filteri.sezona.includes(s)}
                                            onChange={() => toggleFilter('sezona', s)}
                                        />
                                        <span className="checkbox-tekst">{s}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    
                        <div className="filter-kolona">
                            <p className="filter-naslov">KATEGORIJA:</p>
                            <div className="checkbox-grupa-vertical">
                                {[
                                    { label: 'Cvjetni', value: 'cvjetni' },
                                    { label: 'Orijentalni / Slatki', value: 'orijentalni,slatki' },
                                    { label: 'Drveni', value: 'drvenasti' },
                                    { label: 'Svježi / Citrusni', value: 'svjezi,citrusni' },
                                    { label: 'Voćni', value: 'vocni' }
                                ].map((kat) => (
                                    <label key={kat.value} className="custom-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="real-checkbox"
                                            checked={filteri.mirisna_grupa.includes(kat.value)}
                                            onChange={() => toggleFilter('mirisna_grupa', kat.value)}
                                        />
                                        <span className="checkbox-tekst">{kat.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        
                        <div className="filter-kolona">
                            <p className="filter-naslov">INTENZITET:</p>
                            <div className="checkbox-grupa-vertical">
                                {['Umjeren', 'Jak'].map((i) => (
                                    <label key={i} className="custom-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="real-checkbox"
                                            checked={filteri.intenzitet.includes(i)}
                                            onChange={() => toggleFilter('intenzitet', i)}
                                        />
                                        <span className="checkbox-tekst">{i}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* POL */}
                        <div className="filter-kolona">
                            <p className="filter-naslov">POL:</p>
                            <div className="checkbox-grupa-vertical">
                                {['Muški', 'Ženski', 'Unisex'].map((p) => (
                                    <label key={p} className="custom-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="real-checkbox"
                                            checked={filteri.pol.includes(p)}
                                            onChange={() => toggleFilter('pol', p)}
                                        />
                                        <span className="checkbox-tekst">{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="panel-actions">
                        <button className="apply-filters-btn" onClick={handlePrimijeniFiltere}>
                            POTRAŽI
                        </button>

                        <button className="cancel-filters-btn" onClick={handleOtkazi}>
                            OTKAŽI
                        </button>
                    </div>
                </div>
            )}

            <div className="perfume-grid">
                {parfemi.length > 0 ? (
                    parfemi.map((parfem) => (
                        <div key={parfem.id} className="perfume-card" onClick={() => navigate(`/parfem/${parfem.id}`)}>
                            <div className="card-image">
                                <img src={`/images/${parfem.slika_dp}`} alt={parfem.naziv_originala} />
                            </div>
                            <div className="card-info">
                                <h3>{parfem.naziv_originala}</h3>
                                <p>{parfem.brend_originala}</p>
                                <div className="learn-more-box">
                                    <span className="heart-icon">❤</span>
                                    <span>Klikni da saznaš nešto više o meni</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results-wrapper">
                        <div className="no-results-content">
                            <span className="no-results-icon">✨</span>
                            <p className="no-results-text">Nažalost, trenutno nema parfema koji odgovaraju tvojim kriterijumima.</p>
                            <button className="reset-search-btn" onClick={handleOtkazi}>
                                PONIŠTI FILTERE
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Katalog;