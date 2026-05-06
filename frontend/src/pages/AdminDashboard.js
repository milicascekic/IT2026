import React, { useState } from 'react';
import './Admin.css';
import Add from './Add';
import ListaParfema from './ListaParfema';

const AdminDashboard = () => {
    const [aktivniPrikaz, setAktivniPrikaz] = useState('pocetna');

    const togglePrikaz = (prikaz) => {
        if (aktivniPrikaz === prikaz) {
            setAktivniPrikaz('pocetna');
        } else {
            setAktivniPrikaz(prikaz);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>

            <div className="admin-nav">
                <button
                    className={aktivniPrikaz === 'dodaj' ? 'btn-active' : ''}
                    onClick={() => togglePrikaz('dodaj')}
                >
                    Dodaj novi parfem
                </button>

                <button
                    className={aktivniPrikaz === 'lista' ? 'btn-active' : ''}
                    onClick={() => togglePrikaz('lista')}
                >
                    Prikaz svih parfema
                </button>
            </div>

            <div className="admin-content">
                {aktivniPrikaz === 'dodaj' && <Add />}

                {aktivniPrikaz === 'lista' && (
                    <div className="table-responsive-wrapper">
                        <ListaParfema />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;