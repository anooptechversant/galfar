import React from "react";
import Header from "../../Components/PageComponents/Header";
import Sidebar from "../../Components/PageComponents/Sidebar";
import Table from "../../Components/CommonComponents/Table";
export default function Menu() {
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Menu</h1>
            <Table />
        </div>
    );
}
