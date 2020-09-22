import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/details" exact component={Details} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
