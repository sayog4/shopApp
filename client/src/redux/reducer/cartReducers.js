import CART_CONSTANT from '../constant/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_CONSTANT.CART_ADD_ITEM:
      const item = action.payload;

      const itemExists = state.cartItems.find(i => i.product === item.product);
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.product === itemExists.product ? item : i
          )
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_CONSTANT.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload)
      };
    case CART_CONSTANT.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    default:
      return state;
  }
};
