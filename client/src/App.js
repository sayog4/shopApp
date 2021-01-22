import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import CategoryListPage from './pages/CategoryListPage';
import CategoryEditPage from './pages/CategoryEditPage';
import CategoryCreatePage from './pages/CategoryCreatePage';
import UserEditPage from './pages/UserEditPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-3">
        <Switch>
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/shop" exact component={ShopPage} />
          <PrivateRoute path="/profile" exact component={ProfilePage} />
          <AdminRoute path="/admin/userlist" exact component={UserListPage} />
          <AdminRoute
            path="/admin/user/:id/edit"
            exact
            component={UserEditPage}
          />
          <AdminRoute
            path="/admin/categoryList"
            exact
            component={CategoryListPage}
          />
          <AdminRoute
            path="/admin/category/create"
            exact
            component={CategoryCreatePage}
          />
          <AdminRoute
            path="/admin/category/:id/edit"
            exact
            component={CategoryEditPage}
          />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
