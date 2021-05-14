import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';

import { useTranslation } from 'react-i18next';

function Loading() {
    const [t, i18n] = useTranslation("global");

    const filename = this.props.location.state;
    console.log(filename);
        /*const formData = new FormData();
        var urlText = document.getElementById('urlText').value;
        setUrl(urlText);
        formData.append("urlText", urlText);

        try {
            const res = await axios.post(
                "http://localhost:3002/ytconvert",
                formData
            );
            console.log(res.data);
            //if(res){
            //    history.push('/loading')
            //}
        } catch (ex) {
            console.log(ex);
        }*/
  
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
        <div class="nav justify-content-end">
          <select className="dropdown" onChange={changeLanguage} id="selectBox">
            <option value="1">Español</option>
            <option value="2">Català</option>
            <option selected value="3">English</option>
          </select>
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
        <img src={logo} className="logoHorizontal" alt="logo" />
        <h5 className="text">
        Loading<br/><br/><br/><br/><br/><br/><br/>
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
  
  export default Loading;