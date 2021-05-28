// Dependencies
import React, { useState } from 'react';
import '../css/App.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Arxiu JS per pujar un arxiu.
function FunctionClickFile() {
    
    // Variable per guardar l'arxiu.
    const [file, setFile] = useState();
    
    // Variable per guardar el nom de l'arxiu.
    const [fileName] = useState("");
    
    // Variable per canviar l'idioma del text per cada idioma que té la web.
    const [t] = useTranslation("global");
    
    // Variable per redirigir d'una pàgina a una altre.
    const history = useHistory();

    // Variables per habilitar i deshabilitar el botó d'enviar l'arxiu mentre les funcions s'estàn processant.
    const [disable, setDisable] = useState(false);
    
    // Funció per pujar l'arxiu mp3 a l'API.
    const uploadFile = async (e) => {
        setDisable(true)
        setFile(e.target.files[0]);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://35.195.233.122:3002/upload",
                formData
            );
            console.log(res);
            if (res) {
                history.push({
                    pathname: '/loading',
                    state: { url: res.data }
                });
            }
        } catch (ex) {
            console.log(ex);
        }
        setDisable(false)
    }

    // Funció per canviar el text de predefinit per el nom de l'arxiu seleccionat.
    const changeButton = () => {
        var realFileBtn = document.getElementById("real-file");

        var customTxt = document.getElementById("custom-text");

        realFileBtn.click();
    
        realFileBtn.addEventListener("change", function() {
            if(realFileBtn.value) {
                customTxt.innerHTML = realFileBtn.value.replace(/^.*[\\\/]/, '');
            } else {
                customTxt.innerHTML = t("words.no-file");
            }
        })
    }

    // HTML que s'implementa a l'executar l'arxiu.     
    return (
        <div className="divFunction">
            <div className="divBackground">
                <input type="file" accept=".mp3" hidden id="real-file" required></input>
                <button type="button" className="buttonLight" onClick={changeButton} id="custom-button">{t("words.chose-file")}</button>
                <span id="custom-text" className="customText" >{t("words.no-file")}</span>
            </div>
            <div className="divButton">
                <button class="btn btn-dark" onClick={uploadFile} disabled={disable} type="submit">{t("words.upload-file")}</button>
            </div>
        </div>
    )
}

export default FunctionClickFile
