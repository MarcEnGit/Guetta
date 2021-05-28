//Dependencies
import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// Arxiu JS de la pàgina Error.
function Error() {
  
  // Variable per canviar l'idioma de la pàgina.  
  const [t, i18n] = useTranslation("global");

  // Variable per redirigir a una pàgina.  
  const history = useHistory();

  // HTML que es mostra quan s'executa aquesta pestanya.
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity:0}}
    >
    <div className="App">
      <img src={logo} className="logoHorizontal" onClick={() => {history.push("/")}} alt="logo" />
      <h3>{t("words.error-1")}</h3>
      <br/>
      <h5>{t("words.error-2")}</h5>
      <h5>{t("words.error-3")}</h5>
    </div>
    </motion.div>
  );
}

export default Error;
