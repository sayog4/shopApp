import USER_CONSTANTS from '../constant/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSTANTS.USER_LOGIN_REQUEST:
      return {
        loading: true
      };
    case USER_CONSTANTS.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload
      };
    case USER_CONSTANTS.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case USER_CONSTANTS.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSTANTS.USER_REGISTER_REQUEST:
      return {
        lodaing: true
      };
    case USER_CONSTANTS.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload
      };
    case USER_CONSTANTS.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
