import React, { useState } from 'react';
import '../css/App.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function FunctionClickFile() {
    const [file] = useState();
    const [fileName] = useState("");

    const [t] = useTranslation("global");

    const history = useHistory();

    const [disable, setDisable] = useState(false);

    const uploadFile = async (e) => {
        setDisable(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:3002/upload",
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

    return (
        <div className="divFunction">
            <div className="divBackground">
                <input type="file" accept=".mp3" hidden id="real-file"></input>
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
