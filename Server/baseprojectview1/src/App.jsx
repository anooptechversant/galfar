import React from "react";
import Login from "./Pages/login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Menu from "./Pages/Menu/Menu";
import Layout from "./Pages/Layout";
import Test from "./Pages/Test";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="" element={<Layout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="test" element={<Test />} />
                            <Route path="menu" element={<Menu />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
