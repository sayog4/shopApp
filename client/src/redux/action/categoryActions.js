import axios from 'axios';
import CATEGORY_CONSTANT from '../constant/categoryConstants';

export const listCategory = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_CONSTANT.CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`/api/category`);
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const createCategory = (name, image) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CONSTANT.CATEGORY_CREATE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.post(`/api/category`, { name, image }, config);
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const deleteCategory = id => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CONSTANT.CATEGORY_DELETE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.delete(`/api/category/${id}`, config);
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const updateCategory = (id, name, image) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CATEGORY_CONSTANT.CATEGORY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put(
      `/api/category/${id}`,
      { name, image },
      config
    );
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const singleCategory = id => async dispatch => {
  try {
    dispatch({ type: CATEGORY_CONSTANT.CATEGORY_SINGLE_REQUEST });

    const { data } = await axios.get(`/api/category/${id}`);
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_SINGLE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};

export const productsByCategory = id => async dispatch => {
  try {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_REQUEST
    });
    const { data } = await axios.get(`/api/products/category/${id}`);
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CONSTANT.CATEGORY_FETCH_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
    });
  }
};
