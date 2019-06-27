import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Dashboard from './components/dashboard/Dashboard';
import ChangeProfile from './components/citizen/ChangeProfile';
import Welcome from './components/connexion/Welcome';
import Connect from './components/connexion/Connect';
import Home from './components/Home';
import BottomNav from './components/BottomNav';
import Signin from './components/connexion/Signin';
import PasswordForget from './components/connexion/PasswordForget';
import CreateAnnonce from './components/annonces/CreateAnnonce';
import CreateAnnonceUser from './components/annonces/CreateAnnonceUser';
import SpendCredits from './components/spendcredits/SpendCredits';
import MyProfile from './components/citizen/MyProfile';
import agentProfile from './components/agent/agentProfile';
import SeeAnnounce from './components/annonces/SeeAnnounce';
import './App.css';

const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/createAnnonce" component={CreateAnnonce} />
          <Route exact path="/" component={Welcome} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signin" component={Signin} />
          <Route path="/myprofile" component={MyProfile} />
          <Route path="/changeprofile" component={ChangeProfile} />
          <Route path="/agentprofile" component={agentProfile} />
          <Route path="/home" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/connect" component={Connect} />
          <Route path="/profile" component={Connect} />
          <Route path="/reset" component={PasswordForget} />
          <Route path="/annonce/:annonceid?" component={SeeAnnounce} />
          <Route path="/createAnnonceUser" component={CreateAnnonceUser} />
          <Route path="/createAnnonceUser" component={CreateAnnonceUser} />
          <Route path="/SpendCredits" component={SpendCredits} />
        </Switch>
        {' '}
        <BottomNav />
      </HashRouter>
    </FirebaseProvider>
  </div>
);

export default App;
