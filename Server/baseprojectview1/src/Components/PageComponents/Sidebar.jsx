import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import './css/Sidebar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import loginAction from "../../Actions/loginAction";
import commonAction from "../../Actions/commonAction";
import getLoginData from "../../Api/loginApi";

export default function Sidebar() {
    const dispatch = useDispatch();
    const data = useSelector(state => state);
    console.log(data)
    const clicked = ()=>{
        dispatch(getLoginData());
        //getLoginData(dispatch);
        //dispatch(commonAction(true));
    }
    return (
        <div>
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href="index.html"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={faLaughWink} size="2x"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        SB Admin <sup>2</sup>
                    </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <span className="nav-link">
                        <FontAwesomeIcon icon={faTachometerAlt}/>
                        <span className="dash" onClick={clicked}>{/* <Link to="dashboard"> */}Dashboard{/* </Link> */}</span>
                    </span>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">Interface</div>

                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                    >
                        <FontAwesomeIcon icon={faGear} />
                        <span className="comp">Menu</span>
                    </a>
                    <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionSidebar"
                    >
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">
                                Custom Components:
                            </h6>
                            <a className="collapse-item" href="buttons.html">
                                ADD MENU
                            </a>
                            <span className="collapse-item" href="cards.html">
                                <span className="sideLink"><Link to="/menu">Menu</Link></span>
                            </span>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">Addons</div>

                <li className="nav-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapsePages"
                        aria-expanded="true"
                        aria-controls="collapsePages"
                    >
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div
                        id="collapsePages"
                        className="collapse"
                        aria-labelledby="headingPages"
                        data-parent="#accordionSidebar"
                    >
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">
                                Login
                            </a>
                            <a className="collapse-item" href="register.html">
                                Register
                            </a>
                            <a
                                className="collapse-item"
                                href="forgot-password.html"
                            >
                                Forgot Password
                            </a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">
                                404 Page
                            </a>
                            <a className="collapse-item" href="blank.html">
                                Blank Page
                            </a>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                    ></button>
                </div>
            </ul>
        </div>
    );
}
