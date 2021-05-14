import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';

import { useTranslation } from 'react-i18next';

function AboutUs() {
  const [t, i18n] = useTranslation("global");

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
      <img src={logo} className="logoHorizontal" alt="logo" />
      <h2>ABOUT US</h2><br/>
      <h5 className="text">
      With Guetta you have at your fingertips the possibility of getting all the sounds of your
favorite songs.<br/><br/>

Millions of people around the world feel limited when it comes to
create your own musical projects based on different songs. Guetta
It will help them to do their new songs with a high quality.<br/><br/>

Our objective is to provide music by and for everyone. What are you waiting for
enjoy Guetta?<br/><br/><br/><br/><br/><br/><br/>
      </h5>
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

export default AboutUs;