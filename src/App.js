import React from 'react';
import FirebaseProvider from './Firebase/FirebaseProvider';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import './App.css';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
