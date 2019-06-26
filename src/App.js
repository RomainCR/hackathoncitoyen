import React from 'react';
import FirebaseProvider from './Firebase/FirebaseProvider';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import usePoints from './components/usePoints'
import './App.css';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/usePoints" component={usePoints} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
