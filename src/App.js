import React from 'react';
import FirebaseProvider from './Firebase/FirebaseProvider';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Welcome from './components/connexion/Welcome';
import Connect from './components/connexion/Connect';
import Home from './components/Home';
import Signin from './components/connexion/Signin';
import MyProfile from './components/myprofile/MyProfile';
import ChangeProfile from './components/myprofile/ChangeProfile';
import PasswordForget from './components/connexion/PasswordForget';
import CreateAnnonce from './components/annonces/CreateAnnonce'
import './App.css';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route path="/createAnnonce" component={CreateAnnonce} />
        <Route exact path="/" component={Welcome} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={Signin} />
        <Route path="/myprofile" component={MyProfile} />
        <Route path="/changeprofile" component={ChangeProfile} />
        <Route path="/home" component={Home} />
        <Route path="/connect" component={Connect} />
        <Route path="/reset" component={PasswordForget} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
