import React from "react";
import FirebaseProvider from "./Firebase/FirebaseProvider";
import { HashRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Welcome from "./components/connexion/Welcome";
import Connect from "./components/connexion/Connect";
import Signin from "./components/connexion/Signin";
import PasswordForget from "./components/connexion/PasswordForget";
import CreateAnnonce from "./components/annonces/CreateAnnonce";
import CreateAnnonceUser from "./components/annonces/CreateAnnonceUser";
import BottomNav from "./components/BottomNav";
import SpendCredits from "./components/spendcredits/SpendCredits";
import Profile from "./components/myprofile/Profile";
import SeeAnnounce from './components/annonces/SeeAnnounce'
import "./App.css";

const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/createAnnonce" component={CreateAnnonce} />
          <Route path="/SpendCredits" component={SpendCredits} />
          <Route path="/createAnnonceUser" component={CreateAnnonceUser} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signin" component={Signin} />
          <Route path="/connect" component={Connect} />
          <Route path="/reset" component={PasswordForget} />
          <Route path="/profile/" component={Profile} />
          <Route path="/annonce/:annonceid?" component={SeeAnnounce} />
        </Switch>{" "}
        <BottomNav />
      </HashRouter>
    </FirebaseProvider>
  </div>
);

export default App;
