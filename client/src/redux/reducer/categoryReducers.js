import CATEGORY_CONSTANT from '../constant/categoryConstants';

export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload
      };
    case CATEGORY_CONSTANT.CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_CREATE_REQUEST:
      return {
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CATEGORY_CONSTANT.CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case CATEGORY_CONSTANT.CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_DELETE_REQUEST:
      return {
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CATEGORY_CONSTANT.CATEGORY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case CATEGORY_CONSTANT.CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CATEGORY_CONSTANT.CATEGORY_UPDATE_RESET:
      return {
        category: {}
      };
    default:
      return state;
  }
};

export const categorySingleReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_SINGLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload
      };
    case CATEGORY_CONSTANT.CATEGORY_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const categoryFetchProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page
      };
    case CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
