import logo from '../img/logo_hor_big.png';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';

import { useTranslation } from 'react-i18next';

function Privacy() {
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
      <div class="nav justify-content-end">
        <select className="dropdown" onChange={changeLanguage} id="selectBox" >
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
      <h2>PRIVACY POLICY</h2><br/>
      <h5 className="text">
Pursuant to our Terms of Use, this document describes how we treat personal information related to your use of this website and the services offered on and through it (the „Service”), including information you provide when using it.<br/><br/>

We expressly and strictly limit use of the Service to adults over 18 years of age or the age of majority in the individual's jurisdiction, whichever is greater. Anyone under this age is strictly forbidden from using the Service. We do not knowingly seek or collect any personal information or data from persons who have not attained this age.<br/><br/>

<b>Data Collected</b> <br/>
Using the Service. When you access the Service, use the search function, convert files or download files, your IP address, country of origin and other non-personal information about your computer or device (such as web requests, browser type, browser language, referring URL, operating system and date and time of requests) may be recorded for log file information, aggregated traffic information and in the event that there is any misappropriation of information and/or content.<br/><br/>

Usage Information. We may record information about your usage of the Service such as your search terms, the content you access and download and other statistics.<br/><br/>

Uploaded Content. Any content that you upload, access or transmit through the Service may be collected by us.<br/><br/>

Correspondences. We may keep a record of any correspondence between you and us.<br/><br/>

Cookies. When you use the Service, we may send cookies to your computer to uniquely identify your browser session. We may use both session cookies and persistent cookies.<br/><br/>

<b>Data Usage</b> <br/>
We may use your information to provide you with certain features and to create a personalized experience on the Service. We may also use that information to operate, maintain and improve features and functionality of the Service.<br/><br/>

We use cookies, web beacons and other information to store information so that you will not have to re-enter it on future visits, provide personalized content and information, monitor the effectiveness of the Service and monitor aggregate metrics such as the number of visitors and page views (including for use in monitoring visitors from affiliates). They may also be used to provide targeted advertising based on your country of origin and other personal information.<br/><br/>

We may aggregate your personal information with personal information of other members and users, and disclose such information to advertisers and other third-parties for marketing and promotional purposes.<br/><br/>

We may use your information to run promotions, contests, surveys and other features and events.<br/><br/>

<b>Disclosures of Information</b> <br/>
We may be required to release certain data to comply with legal obligations or in order to enforce our Terms of Use and other agreements. We may also release certain data to protect the rights, property or safety of us, our users and others. This includes providing information to other companies or organizations like the police or governmental authorities for the purposes of protection against or prosecution of any illegal activity, whether or not it is identified in the Terms of Use.<br/><br/>

If you upload, access or transmit any illegal or unauthorized material to or through the Service, or you are suspected of doing such, we may forward all available information to relevant authorities, including respective copyright owners, without any notice to you.<br/><br/>

<b>Miscellaneous</b> <br/>
While we use commercially reasonable physical, managerial and technical safeguards to secure your information, the transmission of information via the Internet is not completely secure and we cannot ensure or warrant the security of any information or content you transmit to us. Any information or content you transmit to us is done at your own risk.<br/><br/><br/><br/><br/><br/><br/>

      </h5>
      <div className="parent">
        <Link className="terms" to="./terms">{t("words.terms")}</Link>
        <Link className="privacy" to="./privacy">{t("words.privacy")}</Link>
      </div>
      <br/>
      <br/>
    </div>
    </motion.div>
  );
}

export default Privacy;