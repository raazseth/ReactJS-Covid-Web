import axios from "../Helpers/axios";
import { authConstants, userConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post("/signup", {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCESS,
        payload: { message: "User Created Successfully" },
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};



export const login = (user) => {
    return async (dispatch) => {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/signin", {
        ...user,
      });
  
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    };
  };
  
  export const isuserLoggedIn = () => {
    return async (dispatch) => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
          type: authConstants.LOGIN_SUCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: "Failed to login" },
        });
      }
    };
  };
  
  export const logout = () => {
    return async (dispatch) => {
      dispatch({
        type: authConstants.LOGOUT_REQUEST,
      });
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCESS,
      });
    };
  };
  