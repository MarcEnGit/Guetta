//Dependencies
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../img/logo_vertical.png";
import { Link, useLocation } from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import { motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Arxiu JS de la pàgina Loading.
function Loading() {

  // Variable per canviar l'idioma de la pàgina.
  const [t, i18n] = useTranslation("global");
	
  // Variable on guardem l'email.	
  const [email, setEmail] = useState('');
  
  // Variable on guardem la funció useHistory() per poder redirigir
  const history = useHistory();
	
  // Variable que guarda la informaciò que passem per POST a la API
  const formData = new FormData();

	function fileNameAndExt(str){
		var file = str.split('.');
		return file[0];
  }

  // Nom de la carpeta on treballem sense extensió
  var filenameWithoutExt = fileNameAndExt(history.location.state.url);
 
    // Afegim el nom de la carpeta de treball a la petició a la API
    formData.append("filename", history.location.state.url);
    
    // Quan carrega la pàgina fem la petició de separar la cançó a la API
    useEffect(() => {
      async function split() {
        try {
          const res = await axios.post(
              "http://35.195.233.122:3002/separate",
              formData
          );
 
	  // Al acabar i rebre la resposta de la API, redirigim a l'usuari a visualitzar els arxius
	  if(res){
                history.push({
                pathname: '/files',
                search: '?file='+filenameWithoutExt});
	  }

      } catch (ex) {
          console.log(ex);
      }
      }
      split();
    }, []);

    // Variable per canviar l'idioma al canviar l'opció del desplegable.
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

    // Variable per habilitar i deshabilitar el botó d'enviar quan s'executen les funcions.
    const [disable, setDisable] = useState(false);

    // Quan l'usuari fica el mail i clicka el botó, s'envia a l'API el email proporcionat i el fiquem a la BBDD
    const uploadEmail = async (e) => {
      setDisable(true)
      var emailText = document.getElementById('emailText').value;
      setEmail(emailText);
      formData.append("email", emailText);
      try {
          const res = await axios.post(
              "http://35.195.233.122:3002/sendmail",
              formData
          );
      } catch (ex) {
          console.log(ex);
      }
      setDisable(false);
  }
    
  // HTML que es visualitza quan s'executa aquesta pestanya.
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity:0}}
    >
      <div className="App">
        <div className="dropdowns">
          <div className="divLeft">
            <select className="dropdown" onChange={changeLanguage} id="selectBox">
              <option value="1">Castellano</option>
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
        <div className="divEmail">
          <p>
            {t("words.email")}
          </p>
          <input id="emailText" className="inputText" type="text" />
          <div className="divButton">
            <button class="btn btn-dark" onClick={uploadEmail} disabled={disable} type="submit">{t("words.upload-email")}</button>
          </div>
        </div>
        <div className="parent">
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
