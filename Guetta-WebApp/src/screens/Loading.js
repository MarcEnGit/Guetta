import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../img/logo_vertical.png";
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';

import { useTranslation } from 'react-i18next';

function Loading() {
  const [t, i18n] = useTranslation("global");

    /*const history = useHistory();

      console.log(history.location.state.url);

      const formData = new FormData();  
      var urlText = document.getElementById('urlText').value;
      setUrl(urlText);
      formData.append("urlText", urlText);*/

    const changeLanguage = () => {
      var selectBox = document.getElementById("selectBox");
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;

      if (selectedValue === "1"){
        i18n.changeLanguage("es")
      }
      if (selectedValue === "2"){
        i18n.changeLanguage("cat")
      }
      if (selectedValue === "3"){
        i18n.changeLanguage("en")
      }
    }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity:0}}
    >
    <div className="App">
      <div className="dropdowns">
        <div className="divLeft" >
          <select className="dropdown" onChange={changeLanguage} id="selectBox">
            <option value="1">Español</option>
            <option value="2">Català</option>
            <option selected value="3">English</option>
          </select>
        </div>
        <div className="divRight">
          <ul>
            <div className="navbar">
              <li class="nav-item">
                <Link class="nav-link active" style={{color: '#fff'}} to="/">{t("words.home")}</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" style={{color: '#fff'}} to="/aboutus">{t("words.aboutus")}</Link>
              </li>
            </div>
          </ul>
        </div> 
      </div>     
      <img src={logo} className="logo" alt="logo" />
      <div className="loadingSvg">
        <svg viewBox="0 0 135 140" fill="currentColor" width="40" role="progressbar">
          <rect y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="30" y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="60" width="15" height="140" rx="6">
            <animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="90" y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="120" y="10" width="15" height="120" rx="6">
            <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
        </svg>
      </div>
      <div className="loadingText">
        <p>
          {t("words.link")}
        </p>
      </div>
      <div className="parent2">
        <Link className="terms" to="/terms">{t("words.terms")}</Link>
        <Link className="privacy" to="/privacy">{t("words.privacy")}</Link>
      </div>
      <br/>
      <br/>
    </div>
    </motion.div>
    );
}

export default Loading;