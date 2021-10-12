
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from './components/login/login';
import dashboardform from './components/dashboardform'
import Adddishes from './components/Add item/Adddishes';
import Test from './components/test/Test';
function App() {
  return (
    <Router>
        <Switch>
          <Route path='/dashboard' exact component={Test} />
          <Route path='/' exact component={login} />
          <Route path='/adddishes' exact component={Adddishes} />
          
        </Switch>
      </Router>
  );
}

export default App;
