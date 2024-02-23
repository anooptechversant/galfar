import React from "react";
import Email from "../Components/InputComponents/Email";
import Password from "../Components/InputComponents/Password";
import Checkbox from "../Components/InputComponents/Checkbox";
import { Outlet } from "react-router-dom";

function Login() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">
                                                Welcome Bac
                                            </h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <Email />
                                            </div>
                                            <div className="form-group">
                                                <Password />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <Checkbox />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheck"
                                                    >
                                                        Remember
                                                    </label>
                                                </div>
                                            </div>
                                            <a
                                                href="index.html"
                                                className="btn btn-primary btn-user btn-block"
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
