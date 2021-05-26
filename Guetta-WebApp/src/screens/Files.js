import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { motion} from 'framer-motion';
import axios from 'axios';
import downloadjs from 'downloadjs';
import AudioPlayer from 'react-h5-audio-player';


import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Files() {
  const [t, i18n] = useTranslation("global");
  
  let query = useQuery();

  const formData = new FormData();

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

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function download(directory, filename){
  	try {
        console.log("heyyyy")
        const res = await fetch('http://guetta-app.com:3002/download?filename='+directory+'/'+filename);
	const blob = await res.blob();
	downloadjs(blob, filename);
    } catch (ex) {
        console.log(ex);
    }
  }

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

      document.getElementById("container_audio").appendChild(button);

      var sound = document.createElement('audio');
      sound.controls = 'controls';
      sound.src = 'http://guetta-app.com:3002/'+file+"/"+m;
      document.getElementById("container_audio").appendChild(sound);

      var br = document.createElement('br');
      document.getElementById("container_audio").appendChild(br);

    }
  }

  var file = query.get('file')

  useEffect(() => {
    async function split() {
      try {
        console.log("heyyyy")
        const res = await axios.get("http://guetta-app.com:3002/play?file="+file);
        console.log(res.data);
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
