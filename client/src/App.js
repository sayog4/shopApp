import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-3">
        <Switch>
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
