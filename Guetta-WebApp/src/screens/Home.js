//Dependencies
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../img/logo_vertical.png";
import { Link } from 'react-router-dom';
import FunctionClickFile from '../functions/FunctionClickFile';
import FunctionClickUrl from '../functions/FunctionClickUrl';
import React, {useState} from 'react';
import { motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Arxiu JS de la pàgina Home.
function Home() {
  
  // Variable per canviar l'idioma de la pàgina.  
  const [t, i18n] = useTranslation("global");

  // Variables per mostrar o ocular l'HTML que es mostra en els arxius FunctionClickFIle i FunctionClickUrl.
  const [isShowUrl, setIsShowedUrl] = useState(false);
  const [isShowFile, setIsShowedFile] = useState(false);

  // Variable per canviar l'idioma de la pàgina al canviar l'opció del desplegable.
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
  
  // Funciò per mostrar o ocular l'HTML que es mostra en l'arxius FunctionClickUrl.
  function showURL() {
    setIsShowedUrl(isShowUrl => !isShowUrl);
    if (isShowFile === true) {
      setIsShowedFile(isShowFile => !isShowFile);
    } 
  }

  // Funciò per mostrar o ocular l'HTML que es mostra en l'arxius FunctionClickFile.
  function showFile() {
    setIsShowedFile(isShowFile => !isShowFile);
    if (isShowUrl === true) {
      setIsShowedUrl(isShowUrl => !isShowUrl);
    }
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
        <div className="divLeft" >
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
      <div className="buttonsMain">
        <div className="button1Main">
          <button type="button" class="btn btn-dark" onClick={showURL}>{t("words.button-url")}</button>
        </div>
        <div className="button2Main">
          <button type="button" class="btn btn-dark" onClick={showFile}>{t("words.button-upload")}</button>
        </div>
        {isShowUrl && (<FunctionClickUrl />)}
        {isShowFile && (<FunctionClickFile />)}
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

export default Home;
