import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer';

const ShopPage = lazy(() => import('./pages/ShopPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UserListPage = lazy(() => import('./pages/UserListPage'));
const CategoryListPage = lazy(() => import('./pages/CategoryListPage'));
const CategoryEditPage = lazy(() => import('./pages/CategoryEditPage'));
const CategoryCreatePage = lazy(() => import('./pages/CategoryCreatePage'));
const UserEditPage = lazy(() => import('./pages/UserEditPage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const ProductEditScreen = lazy(() => import('./pages/ProductEditScreen'));
const ProductCreatePage = lazy(() => import('./pages/ProductCreatePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const PlaceOrderPage = lazy(() => import('./pages/PlaceOrderPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const OrderListPage = lazy(() => import('./pages/OrderListPage'));

const HomePage = lazy(() => import('./pages/HomePage'));

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3" style={{ minHeight: '75vh' }}>
        <Container>
          <Switch>
            <Suspense fallback={<Loader />}>
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
              <PrivateRoute
                path="/placeorder"
                exact
                component={PlaceOrderPage}
              />
              <PrivateRoute path="/order/:id" component={OrderPage} />
              <AdminRoute
                path="/admin/userlist"
                exact
                component={UserListPage}
              />
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
            </Suspense>
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
