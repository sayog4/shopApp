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
import ProductListPage from './pages/ProductListPage';
import ProductEditScreen from './pages/ProductEditScreen';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderListPage from './pages/OrderListPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3" style={{ minHeight: '75vh' }}>
        <Container>
          <Switch>
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />

            <Route
              path="/shop/category/:id/page/:pageNumber"
              component={CategoryPage}
            />
            <Route exact path="/shop/category/:id" component={CategoryPage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <PrivateRoute path="/profile" exact component={ProfilePage} />
            <PrivateRoute path="/shipping" exact component={ShippingPage} />
            <PrivateRoute path="/placeorder" exact component={PlaceOrderPage} />
            <PrivateRoute path="/order/:id" component={OrderPage} />
            <AdminRoute path="/admin/userlist" exact component={UserListPage} />
            <AdminRoute
              path="/admin/orderlist"
              exact
              component={OrderListPage}
            />
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
            <AdminRoute
              path="/admin/productlist/page/:pageNumber"
              exact
              component={ProductListPage}
            />
            <AdminRoute
              path="/admin/productlist"
              exact
              component={ProductListPage}
            />
            <AdminRoute
              path="/admin/product/create"
              exact
              component={ProductCreatePage}
            />
            <AdminRoute
              path="/admin/product/:id/edit"
              exact
              component={ProductEditScreen}
            />
            <Route
              path="/shop/search/:keyword/page/:pageNumber"
              exact
              component={ShopPage}
            />
            <Route exact path="/shop/search/:keyword" component={ShopPage} />
            <Route path="/shop/page/:pageNumber" exact component={ShopPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
