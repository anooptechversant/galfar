import React, { useEffect } from "react";
import Email from "../Components/InputComponents/Email";
import Password from "../Components/InputComponents/Password";
import Checkbox from "../Components/InputComponents/Checkbox";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../assets/Images/Loading_icon.gif";
import "./Css/login.css";
import { logIn } from "../Actions/loginActions";

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state);
  const { loginLoading, loginError, userInfo } = data.logIn;
  const Error = data.logIn.loginError;
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo]);
  const handleEmailChange = (newEmail) => {
    setInputEmail(newEmail);
  };
  const handlePasswordChange = (newPassword) => {
    setInputPassword(newPassword);
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(logIn(inputEmail, inputPassword));
  };
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-xl-10 col-lg-12 col-md-9'>
          <div className='card o-hidden border-0 shadow-lg my-5'>
            <div className='card-body p-0'>
              <div className='row'>
                <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
                <div className='col-lg-6'>
                  <div className='p-5'>
                    <div className='text-center'>
                      {Error ? (
                        <span className='loginError'>{loginError}</span>
                      ) : null}
                      {loginLoading ? (
                        <span>
                          <img className='loadImageLogin' src={Loading} />
                        </span>
                      ) : null}
                      <h1 className='h4 text-gray-900 mb-4'>Welcome Back</h1>
                    </div>
                    <form className='user'>
                      <div className='form-group'>
                        <Email onEmailChange={handleEmailChange} />
                      </div>
                      <div className='form-group'>
                        <Password onPasswordChange={handlePasswordChange} />
                      </div>
                      <div className='form-group'>
                        <div className='custom-control custom-checkbox small'>
                          <Checkbox />
                          <label
                            className='custom-control-label'
                            htmlFor='customCheck'
                          >
                            Remember
                          </label>
                        </div>
                      </div>
                      <a
                        className='btn btn-primary btn-user btn-block'
                        onClick={onFormSubmit}
                      >
                        Login
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
