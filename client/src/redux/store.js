import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducer/userReducer';

import {
  categoryListReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categorySingleReducer,
  categoryFetchProductsReducer
} from './reducer/categoryReducers';

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productUpdateReducer,
  productListReducer,
  productCreateReviewReducer
} from './reducer/productReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer
} from './reducer/orderReducers';

import { cartReducer } from './reducer/cartReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categorySingle: categorySingleReducer,
  categoryFetchProducts: categoryFetchProductsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productList: productListReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer
});
const cartItemsFromLS = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromLS = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromLS = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const INITIAL_STATE = {
  userLogin: { userInfo: userInfoFromLS },
  cart: { cartItems: cartItemsFromLS, shippingAddress: shippingAddressFromLS }
};

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(...middleware)
);

export default store;
