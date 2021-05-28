import React, { useState } from 'react';
import '../css/App.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Arxiu JS per pujar un arxiu.
function FunctionClickURL() {
    
    // Constants per guardar la URL.
    const [url, setUrl] = useState('');
    
    // Constant per canviar l'idioma del text per cada idioma que té la web.    
    const [t] = useTranslation("global");
    
    // Constant per redirigir d'una pàgina a una altre.
    const history = useHistory();

    // Constant per habilitar i deshabilitar el botó d'enviar l'arxiu mentre les funcions s'estàn processant.
    const [disable, setDisable] = useState(false);

    // Funció per pujar l'URL a l'API.
    const uploadUrl = async (e) => {
        setDisable(true)
        console.log('press')
        const formData = new FormData();
        var urlText = document.getElementById('urlText').value;
        setUrl(urlText);
        formData.append("urlText", urlText);
        try {
            const res = await axios.post(
                "http://35.195.233.122:3002/ytconvert",
                formData
            );
            console.log(res.data);
            if(res){
                history.push({
                    pathname: '/loading',
                    state: { url:res.data } 
                });
            }
        } catch (ex) {
            console.log(ex);
        }
        setDisable(false)
    }
    
    // Funció que, quan es pressiona la tecla "ENTER" a l'input text, la funció de pujar el link també s'executa.
    const handleKeypress = e => {
        if (e.keyCode === 13) {
            uploadUrl()
        }
    };

    // HTML que s'implementa a l'executar la URL.
    return (
        <div className="divFunction">
            <input id="urlText" className="inputURL" type="text" placeholder={t("words.button-url")} onKeyDown={handleKeypress} />
            <div className="divButton">
                <button class="btn btn-dark" onClick={uploadUrl} disabled={disable} type="submit">{t("words.upload-url")}</button>
            </div>
        </div>
    )
}

export default FunctionClickURL
