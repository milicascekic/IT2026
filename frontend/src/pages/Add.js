import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Add.css";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sifra_dp: "",
            naziv_originala: "",
            brend_originala: "",
            slika_original: "",
            slika_dp: "",
            opis: "",
            pol: "Unisex",
            sezona: [], 
            intenzitet_nivo: 2, 
            gornje_note: "",
            srednje_note: "",
            bazne_note: ""
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClick = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...this.state,
                sezona: this.state.sezona.join(", ") 
            };

            await axios.post("http://localhost:3001/api/parfemi", dataToSend);
            window.location = "/";
        } catch (err) {
            console.log("Greška:", err);
        }
    };
    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                [e.target.name]: file.name, 
                slika_original_preview: URL.createObjectURL(file)
            });
        }
    };
    handleSeasonChange = (e) => {
        const { value, checked } = e.target;
        let { sezona } = this.state;

        if (checked) {
            sezona.push(value);
        } else {
            sezona = sezona.filter(s => s !== value);
        }

        this.setState({ sezona });
    };
    render() {
     return(
        <div className="form-container">
          <h2>Dodaj parfem:</h2>
        <div className="inputRow">
         <input 
          type="text"
          name="sifra_dp"
          placeholder="D&P Šifra(npr. C-10)"
          onChange={this.handleChange}
         />

         <input
          type="text"
          name="naziv_originala"
          placeholder="Originalno ime"
          onChange={this.handleChange}
         />
        <input
        type="text"
        name="brend_originala"
        placeholder="Originalna kompanija"
        onChange={this.handleChange}
        />
        </div>
       <label htmlFor="slika_original">Prikaz originalne bočice parfema:</label>
        <input
        type="file"
        name="slika_original"
        onChange={this.handleFileChange}
        />
        <label htmlFor="slika_dp">Prikaz naše bočice:</label>
        <input
         type="file"
         name="slika_dp"
         onChange={this.handleFileChange}
         />
         <label htmlFor="opis">Opis mirisa:</label>
             <textarea
                 name="opis"
                 value={this.state.opis}
                 onChange={this.handleChange} 
                 rows="4"
             />
        <label htmlFor="pol">Pol:</label>
        <select 
          id="pol"
          name="pol"
          value={this.state.pol}
          onChange={this.handleChange}
        >
        <option value="Unisex">Unisex(podrazumijevano)</option>
        <option value="Zenski">Zenski</option>
        <option value="Muski">Muški</option>
        </select>
             <label>Izaberite godišnja doba:</label>
             <div className="checkbox-group">

                 <input type="checkbox" id="zima" value="Zima"
                     checked={this.state.sezona.includes("Zima")}
                     onChange={this.handleSeasonChange} />
                 <input type="checkbox" id="proljece" value="Proljeće"
                     checked={this.state.sezona.includes("Proljeće")}
                     onChange={this.handleSeasonChange} />
                 <input type="checkbox" id="ljeto" value="Ljeto"
                     checked={this.state.sezona.includes("Ljeto")}
                     onChange={this.handleSeasonChange} />
                 <input type="checkbox" id="jesen" value="Jesen"
                     checked={this.state.sezona.includes("Jesen")}
                     onChange={this.handleSeasonChange} />

                 <label htmlFor="zima">Zima</label>
                 <label htmlFor="proljece">Proljeće</label>
                 <label htmlFor="ljeto">Ljeto</label>
                 <label htmlFor="jesen">Jesen</label>
             </div>
        <label htmlFor="intenzitet_nivo">intenzitet_nivo:</label>
        <select
        id="intenzitet_nivo"
        name="intenzitet_nivo"
        value={this.state.intenzitet_nivo}
        onChange={this.handleChange}
        >
        <option value="1">Lagan miris</option>
        <option value="2">Umjeren miris</option>
        <option value="3">Jak miris</option>
        </select>
        <label htmlFor="gornje_note">Gornje note:</label>
        <input
        type="text"
        name="gornje_note"
        onChange={this.handleChange}
        />
        <label htmlFor="srednje_note">Srednje note:</label>
        <input
        type="text"
        name="srednje_note"
        onChange={this.handleChange}
        />
        <label htmlFor="bazne_note">Bazne note:</label>
        <input
        type="text"
        name="bazne_note"
        onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleClick} className="submit">
           Sačuvaj parfem
        </button>
         </div>

     );
    }  
}   

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Add);