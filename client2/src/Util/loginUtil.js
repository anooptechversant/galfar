import { Navigate } from "react-router-dom";
//Here we are saving the userinfo after loging
const saveUserInfo = (data) => {
  localStorage.setItem("userInfo", data.authorisation.token);
  localStorage.setItem("userDetails", data.user.name)
  localStorage.setItem("refreshToken", "");
  window.location.href = "/test-galfar-client/dashboard";
};
const saveCsrfToken = (data) => {
  //return false;
  //localStorage.setItem("csrfToken", data);
}
//Here we are saving new access token after call refreshtoken api
const saveAccessToken = (data) => {
  localStorage.setItem("userInfo", data.access_token);
  //window.location.href = "/dashboard";
};

const removeUserInfo = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userDetails")
  localStorage.removeItem("refreshToken");
  window.location.href = "/test-galfar-client/login";
};
//To check user is loggedin or not ...
const isLoggedIn = () => {
  try {
    const value = localStorage.getItem("userInfo");
    return !!value;
  } catch {
    return false;
  }
};

export { removeUserInfo, isLoggedIn, saveAccessToken ,saveCsrfToken};
export default saveUserInfo;
