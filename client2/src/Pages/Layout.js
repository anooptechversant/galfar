import React from "react";
import Header from "../Components/PageComponents/Header";
import Sidebar from "../Components/PageComponents/Sidebar";
import Loginoutlet from "../Outlets/Loginoutlet";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../Util/loginUtil";
import "./Css/layout.css";
import Loading from "../assets/Images/Loading_icon.gif";

function Layout() {
  const data = useSelector((state) => state);
  // const loading = data.workType.workTypeloading;
  const { loginLoading } = data.logIn;
 
  const dispatch = useDispatch();
  const accessToken = isLoggedIn();
  const refreshAccessToken = () => {
    const accessToken = isLoggedIn();
    return accessToken;
  };
  /*     useEffect(() => {
        dispatch(getRefreshToken());
        const refreshTokenInterval = setInterval(refreshAccessToken, 1 * 60 * 1000);
        return () => {
            clearInterval(refreshTokenInterval);
        };
    }, []); */
  return (
    <div id='wrapper'>
      {loginLoading ? (
        <div className='spinner'>
          <img className='spinner-icon' src={Loading} />
        </div>
      ) : null}
      <Sidebar />
      <div id='content-wrapper' className='d-flex flex-column'>
        <div id='content'>
          <Header />
          <Loginoutlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
