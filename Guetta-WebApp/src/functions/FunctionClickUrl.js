import React, { useState } from 'react';
import '../css/App.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
function FunctionClickURL() {
    const [url, setUrl] = useState('');
    const [t, i18n] = useTranslation("global");
    const history = useHistory();
    const uploadUrl = async (e) => {
        console.log('press')
        const formData = new FormData();
        var urlText = document.getElementById('urlText').value;
        setUrl(urlText);
        formData.append("urlText", urlText);
        try {
            const res = await axios.post(
                "http://localhost:3002/ytconvert",
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
    }
    const handleKeypress = e => {
        if (e.keyCode === 13) {
            console.log('hola grupo')
            uploadUrl()
        }
    };



    return (
        <div className="divFunction">
            <input id="urlText" className="inputURL" type="text" placeholder={t("words.button-url")} onKeyDown={handleKeypress} />
            <div className="divButton">
                <button class="btn btn-dark" onClick={uploadUrl} type="submit">{t("words.upload-url")}</button>
            </div>
        </div>
    )
}
export default FunctionClickURL