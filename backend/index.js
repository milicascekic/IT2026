const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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


app.get("/", (req, res) => {
    res.send("Backend radi i spreman je za parfeme!");
});

app.get("/api/parfemi", (req, res) => {
    const { pretraga, sezona, mirisna_grupa, intenzitet, pol } = req.query;

    let q = "SELECT * FROM parfemi WHERE 1=1";
    let params = [];

    if (pretraga) {
        q += " AND (sifra_dp LIKE ? OR naziv_originala LIKE ? OR brend_originala LIKE ?)";
        const searchVal = `%${pretraga.trim()}%`;
        params.push(searchVal, searchVal, searchVal); 
    }
    if (sezona) {
        const sezoneNiz = sezona.split(',');
        q += " AND (" + sezoneNiz.map(() => "sezona LIKE ?").join(" OR ") + ")";
        sezoneNiz.forEach(s => params.push(`%${s}%`));
    }

    if (mirisna_grupa) {
        const grupeNiz = mirisna_grupa.split(',');
        q += " AND (" + grupeNiz.map(() => "mirisna_grupa LIKE ?").join(" OR ") + ")";
        grupeNiz.forEach(g => params.push(`%${g}%`));
    }

    
    if (pol) {
        const polNiz = pol.split(',');
        const polPopravljeno = polNiz.map(p => {
            if (p === 'Ženski') return 'Zenski';
            if (p === 'Muški') return 'Muski';
            return p;
        });
        q += ` AND pol IN (${polPopravljeno.map(() => "?").join(",")})`;
        params.push(...polPopravljeno);
    }

    if (intenzitet) {
        const intNiz = intenzitet.split(',');
        const intenzitetMapa = { 'Lagan': 1, 'Umjeren': 2, 'Jak': 3 };
        const intBrojevi = intNiz.map(i => intenzitetMapa[i] || i);

        q += ` AND intenzitet_nivo IN (${intBrojevi.map(() => "?").join(",")})`;
        params.push(...intBrojevi);
    }

    db.query(q, params, (err, data) => {
        if (err) {
            console.log("Greška u SQL pretrazi:", err);
            return res.status(500).json(err);
        }
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
            console.log("SQL Greška pri dodavanju:", err);
            return res.status(500).json(err);
        }
        return res.json({ message: "Parfem dodat!" });
    });
});


app.get("/api/parfemi/:id", (req, res) => {
    const perfumeId = req.params.id;
    const q = "SELECT * FROM parfemi WHERE id = ?";

    db.query(q, [perfumeId], (err, data) => {
        if (err) {
            console.log("Greška u bazi pri prikazu detalja:", err);
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Parfem nije pronađen" });
        }
        return res.json(data[0]);
    });
});



app.post("/api/register", (req, res) => {
    const { ime, prezime, email, password } = req.body;
    const q = "INSERT INTO korisnici (ime, prezime, email, password) VALUES (?, ?, ?, ?)";

    db.query(q, [ime, prezime, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Email već postoji!" });
        res.json({ message: "Uspješno!" });
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM korisnici WHERE email = ? AND password = ?";

    db.query(q, [email, password], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(401).json({ error: "Pogrešni podaci!" });
        }
    });
});


app.delete("/api/parfemi/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM parfemi WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Parfem obrisan!");
    });
});


app.put("/api/parfemi/:id", (req, res) => {
    const id = req.params.id;
    const {
        sifra_dp,
        naziv_originala,
        brend_originala,
        pol,
        sezona,
        intenzitet_nivo,
        opis,
        gornje_note,
        srednje_note,
        bazne_note
    } = req.body;

    const q = `
        UPDATE parfemi 
        SET sifra_dp=?, 
            naziv_originala=?, 
            brend_originala=?, 
            pol=?, 
            sezona=?, 
            intenzitet_nivo=?, 
            opis=?, 
            gornje_note=?, 
            srednje_note=?, 
            bazne_note=? 
        WHERE id = ?`;

    const values = [
        sifra_dp,
        naziv_originala,
        brend_originala,
        pol,
        sezona,
        intenzitet_nivo,
        opis,
        gornje_note,
        srednje_note,
        bazne_note,
        id
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.log("Greška pri ažuriranju:", err);
            return res.status(500).json(err);
        }
        return res.json("Parfem uspješno ažuriran!");
    });
});




app.listen(3001, () => {
    console.log("Backend sluša na portu 3001...");
});