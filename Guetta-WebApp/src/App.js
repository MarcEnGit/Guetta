import '../src/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence} from 'framer-motion';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './screens/Home';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import AboutUs from './screens/AboutUs';
import Loading from './screens/Loading';
import Error from './screens/Error';
import Files from './screens/Files'
import { useState } from 'react';

function App() {
  return (
    <AnimatePresence>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/privacy" component={Privacy}></Route>
          <Route path="/terms" component={Terms}></Route>
          <Route path="/aboutus" component={AboutUs}></Route>
          <Route path="/loading" component={Loading}></Route>
          <Route path="/files" component={Files}></Route>
          <Route path="" component={Error}></Route>
        </Switch>
        </div> 
    </Router>
    </AnimatePresence>
  );
}

export default App;
