import React from 'react';
import FirebaseProvider from './Firebase/FirebaseProvider';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Welcome from './components/connexion/Welcome';
import Connect from './components/connexion/Connect';
import Signin from './components/connexion/Signin';
import PasswordForget from './components/connexion/PasswordForget';
import CreateAnnonce from './components/annonces/CreateAnnonce'
import './App.css';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/createAnnonce" component={CreateAnnonce} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signin" component={Signin} />
          <Route path="/connect" component={Connect} />
          <Route path="/reset" component={PasswordForget} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
