import '../src/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence} from 'framer-motion';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './screens/Home';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import AboutUs from './screens/AboutUs';
import Loading from './screens/Loading';
import Error from './screens/Error';

function App() {
  return (
    <AnimatePresence>
    <Router>
        <div className="App">
           <Route exact path="/" component={Home}></Route>
           <Route path="/privacy" component={Privacy}></Route>
           <Route path="/terms" component={Terms}></Route>
           <Route path="/aboutus" component={AboutUs}></Route>
           <Route path="/loading" component={Loading}></Route>
           
        </div>
    </Router>
    </AnimatePresence>
  );
}

export default App;
