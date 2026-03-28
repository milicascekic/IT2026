// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Konekcija sa MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NovaLozinka123!',
    database: 'parfimerija'
});

db.connect(err => {
    if (err) {
        console.log("Greška: MySQL nije upaljen ili su podaci pogrešni!", err);
    } else {
        console.log("Povezana si na bazu parfimerija!");
    }
});

// Test ruta
app.get("/", (req, res) => {
    res.send("Backend radi i spreman je za parfeme!");
});

// Dohvati sve parfeme
app.get("/api/parfemi", (req, res) => {
    const q = "SELECT * FROM parfemi";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});


app.post("/api/parfemi", (req, res) => {
    const q = "INSERT INTO parfemi (`sifra_dp`, `naziv_originala`, `brend_originala`, `opis`, `pol`, `intenzitet_nivo`, `gornje_note`, `srednje_note`, `bazne_note`, `sezona`, `slika_original`, `slika_dp`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.sifra_dp,
        req.body.naziv_originala,
        req.body.brend_originala,
        req.body.opis,
        req.body.pol,
        req.body.intenzitet_nivo,
        req.body.gornje_note,
        req.body.srednje_note,
        req.body.bazne_note,
        req.body.sezona,
        req.body.slika_original,
        req.body.slika_dp
    ]; 

    db.query(q, values, (err, data) => {
        if (err) {
            console.log("SQL Greška:", err);
            return res.status(500).json(err);
        }
        return res.json({ message: "Parfem dodat!" });
    });
});

app.listen(3001, () => {
    console.log("Backend sluša na portu 3001...");
});