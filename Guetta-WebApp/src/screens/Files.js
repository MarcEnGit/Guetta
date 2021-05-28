//Dependencies
import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { motion} from 'framer-motion';
import axios from 'axios';
import downloadjs from 'downloadjs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Files() {
  const [t, i18n] = useTranslation("global");
  
  //
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

//Utilitzem la variable query per cridar a la funció useQuery() per rebre i llegir dades per GET que li passem a través del history.
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  //Funció que agafa les pistes seleccionades i les reprodueix començant per el principi
  function playAudio() {
    var drums_check = document.getElementById("drums_check");
    var bass_check = document.getElementById("bass_check");
    var other_check = document.getElementById("other_check");
    var vocals_check = document.getElementById("vocals_check");

    var drums = document.getElementById("drums");
    var bass = document.getElementById("bass");
    var other = document.getElementById("other");
    var vocals = document.getElementById("vocals");

    drums.pause();
    bass.pause();
    other.pause();
    vocals.pause();

    drums.currentTime=0;
    bass.currentTime=0;
    other.currentTime=0;
    vocals.currentTime=0;

    if(drums_check.checked){
	drums.play();
    }

    if(bass_check.checked){ 
	bass.play();
    }

    if(other_check.checked){ 
	other.play();
    }
   
    if(vocals_check.checked){ 
	vocals.play();
    }
  }

  //Funció que para i reinicia tots els audios de la pàgina i deselecciona totes les pistes
  function pauseAudio(){

    document.getElementById("drums_check").checked = false;
    document.getElementById("bass_check").checked = false;
    document.getElementById("other_check").checked = false;
    document.getElementById("vocals_check").checked = false;

    var drums = document.getElementById("drums");
    var bass = document.getElementById("bass");
    var other = document.getElementById("other");
    var vocals = document.getElementById("vocals");

    drums.pause();
    bass.pause();
    other.pause();
    vocals.pause();

    drums.currentTime=0;
    bass.currentTime=0;
    other.currentTime=0;
    vocals.currentTime=0;

  }

  //Funció que crida a la API per descarregar l'arxiu desitjat
  async function download(directory, filename){
  	try {
        const res = await fetch('http://guetta-app.com:3002/download?filename='+directory+'/'+filename);
	const blob = await res.blob();
	downloadjs(blob, filename);
    } catch (ex) {
        console.log(ex);
    }
  }

  //Funció que, un cop carregada la pàgina, crea tots els elements, els checkboxes, els audios i els botons per descarregar
  function setAudio(id) {

    for (let m of id){
      var sourceAudio ='http://guetta-app.com:3002/'+file+"/"+m; 
      var button = document.createElement('input');
      button.type = 'button';
      button.value = m;
      button.className = 'sendButton';
      button.onclick = function() {
	download(file, m);
      };

      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.id = m.split('.')[0]+"_check";

      var sound = document.createElement('audio');
      sound.controls = 'controls';
      sound.id = m.split('.')[0];
      sound.src = 'http://guetta-app.com:3002/'+file+"/"+m;
     
      document.getElementById("container_audio").appendChild(checkbox);
      document.getElementById("container_audio").appendChild(sound);
      document.getElementById("container_audio").appendChild(button);

      var br = document.createElement('br');
      document.getElementById("container_audio").appendChild(br);

    }
  }

  //Variable que emmagatzema el nom de la carpeta on treballar
  var file = query.get('file')

  //Metode useEffect executa la petició a la api un cop carrega la pàgina, aquesta petició ens retornarà els 4 arxius d'audio a mostrar i la seva ruta
  useEffect(() => {
    async function split() {
      try {
        const res = await axios.get("http://guetta-app.com:3002/play?file="+file);
        if(res){
          setAudio(res.data)
        }
    } catch (ex) {
        console.log(ex);
    }
    }
    split();
  }, []);

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
      <img src={logo} className="logoHorizontal" alt="logo" />
      <div id="container_audio">
      </div>
      <button onClick={playAudio} className="sendButton">Play selected</button>
      <button onClick={pauseAudio} className="sendButton">Pause All</button>
      <div className="parent2">
        <Link className="terms" to="./terms">{t("words.terms")}</Link>
        <Link className="privacy" to="./privacy">{t("words.privacy")}</Link>
      </div>
      <br/>
      <br/>
    </div>
    </motion.div>
  );
}

export default Files;
