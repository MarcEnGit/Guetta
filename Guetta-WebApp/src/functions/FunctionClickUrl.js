import React, { useState } from 'react';
import '../css/App.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function FunctionClickURL() {
    const [url, setUrl] = useState('');
    const [t] = useTranslation("global");
    const history = useHistory();

    const [disable, setDisable] = useState(false);

    const uploadUrl = async (e) => {
        setDisable(true)
        console.log('press')
        const formData = new FormData();
        var urlText = document.getElementById('urlText').value;
        setUrl(urlText);
        formData.append("urlText", urlText);
        try {
            const res = await axios.post(
                "http://35.205.50.110:3002/ytconvert",
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

    const handleKeypress = e => {
        if (e.keyCode === 13) {
            uploadUrl()
        }
    };



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
