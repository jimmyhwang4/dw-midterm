import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from "./pages/Home";
import Country from "./pages/Country";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/world">
          <Home />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/">
          <Country />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;