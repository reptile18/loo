import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <div>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;