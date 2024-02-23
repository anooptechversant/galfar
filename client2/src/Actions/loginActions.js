import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  LoginFail,
  LoginReq,
  LoginSuccess,
  Logout,
} from "../Features/logInSlice";
import saveUserInfo, {
  removeUserInfo,
  saveAccessToken,
  saveCsrfToken
} from "../Util/loginUtil";
export const logIn = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    dispatch(LoginReq());
    const { data } = await axiosConfig.post(
      c.LOGIN_URL,
      {
        email: email,
        password: password,
        config
      }
    );
    dispatch(LoginSuccess(data));
    saveUserInfo(data);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(LoginFail(errorIs));
  }
};

export const logout = () => async (dispatch) => {
  removeUserInfo();
  dispatch(Logout());
};

export const getRefreshToken = () => async (dispatch) => {
  try {
    const reFreshConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      },
    };
    const { data } = await axiosConfig.post(c.RE_FRESH_URL, {}, reFreshConfig);
    saveUserInfo(data);
  } catch (error) {}
};
