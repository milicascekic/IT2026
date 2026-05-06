import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaParfema.css';

const ListaParfema = () => {
    const [parfemi, setParfemi] = useState([]);

   
    const [editingId, setEditingId] = useState(null); 
    const [editFormData, setEditFormData] = useState({}); 

    const fetchParfemi = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/parfemi");
            setParfemi(res.data);
        } catch (err) {
            console.error("Greška:", err);
        }
    };

    useEffect(() => {
        fetchParfemi();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Da li si sigurna da želiš obrisati ovaj parfem?")) {
            try {
                await axios.delete(`http://localhost:3001/api/parfemi/${id}`);
                setParfemi(prev => prev.filter(p => p.id !== id));
                alert("Parfem obrisan!");
            } catch (err) {
                alert("Greška pri brisanju!");
            }
        }
    };
    

    const handleSaveUpdate = async (id) => {
        try {
            await axios.put(
                `http://localhost:3001/api/parfemi/${id}`,
                editFormData
            );

            setParfemi(prev =>
                prev.map(p =>
                    p.id === id ? { ...p, ...editFormData } : p
                )
            );

            setEditingId(null);
            alert("Parfem uspješno izmijenjen!");
        } catch (err) {
            console.error(err);
            alert("Greška pri izmjeni parfema!");
        }
    };



   
    const handleEditClick = (parfem) => {
        setEditingId(parfem.id);
        setEditFormData({ ...parfem });
    };

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    return (
        <div className="admin-tabela-container" style={{ overflowX: "auto" }}>
            <table className="admin-tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Šifra</th>
                        <th>Naziv</th>
                        <th>Brend</th>
                        <th>Pol</th>
                        <th>Sezona</th>
                        <th>Intenzitet</th>
                        <th>Opis</th>
                        <th>Akcije</th>
                    </tr>
                </thead>

                <tbody>
                    {parfemi.map(p => (
                        <tr key={p.id}>
                            {editingId === p.id ? (
                                <>
                                    <td>{p.id}</td>
                                    <td><input type="text" name="sifra_dp" value={editFormData.sifra_dp} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="naziv_originala" value={editFormData.naziv_originala} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="brend_originala" value={editFormData.brend_originala} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="pol" value={editFormData.pol} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="sezona" value={editFormData.sezona} onChange={handleInputChange} /></td>
                                    <td><input type="number" name="intenzitet_nivo" value={editFormData.intenzitet_nivo} onChange={handleInputChange} /></td>
                                    <td><textarea name="opis" value={editFormData.opis} onChange={handleInputChange} /></td>
                                    <td>
                                        <button className="btn-izmjeni" onClick={() => handleSaveUpdate(p.id)}>Sačuvaj</button>
                                        <button className="btn-obrisi" onClick={() => setEditingId(null)}>Otkaži</button>
                                    </td>
                                </>
                            ) : (
                                
                                <>
                                    <td>{p.id}</td>
                                    <td className="gold-text">{p.sifra_dp}</td>
                                    <td>{p.naziv_originala}</td>
                                    <td>{p.brend_originala}</td>
                                    <td>{p.pol}</td>
                                    <td>{p.sezona}</td>
                                    <td>{p.intenzitet_nivo}</td>
                                    <td style={{ maxWidth: "200px" }}>{p.opis}</td>
                                    <td>
                                        <button className="btn-izmjeni" onClick={() => handleEditClick(p)}>Izmijeni</button>
                                        <button className="btn-obrisi" onClick={() => handleDelete(p.id)}>Obriši</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaParfema;