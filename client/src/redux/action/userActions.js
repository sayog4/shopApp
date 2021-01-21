import axios from 'axios';
import USER_CONSTANTS from '../constant/userConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_REQUEST
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_CONSTANTS.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );
    dispatch({
      type: USER_CONSTANTS.USER_REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_CONSTANTS.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messsage
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_CONSTANTS.USER_LOGOUT
  });
};
