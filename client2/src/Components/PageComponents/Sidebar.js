import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import './css/Sidebar.css';
import { Link } from "react-router-dom";
import MenuList from "../PageSubComponents/SidebarComponents/MenuList";
import MasterMenu from "../PageSubComponents/SidebarComponents/MasterMenu";
import coporateLogo from "../../assets/Images/logo.png"

export default function Sidebar() {
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
                        {/* <FontAwesomeIcon icon={faLaughWink} size="2x"/> */}
                        <img className="logo-s" src={coporateLogo}/>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        Galfar  <sup>2</sup>
                    </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <span className="nav-link">
                        <FontAwesomeIcon icon={faTachometerAlt}/>
                        <span className="dash" ><Link to="dashboard">Dashboard</Link></span>
                    </span>
                </li>

                <hr className="sidebar-divider" />


                    <MasterMenu />

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
