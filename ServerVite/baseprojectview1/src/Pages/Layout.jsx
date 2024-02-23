import React from "react";
import Header from "../Components/PageComponents/Header";
import Sidebar from "../Components/PageComponents/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
