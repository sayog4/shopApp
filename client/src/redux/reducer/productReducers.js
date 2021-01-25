import PRODUCT_CONSTANT from '../constant/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages
      };
    case PRODUCT_CONSTANT.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_TOP_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_DELETE_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_CONSTANT.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_CREATE_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_CONSTANT.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_UPDATE_RESET:
      return {
        product: {}
      };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CONSTANT.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PRODUCT_CONSTANT.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
