import React from "react";
import { useState } from "react";

export default function Password(props) {
    const { onPasswordChange } = props;
    const [inputPassword,setInputPassword] =  useState("");
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setInputPassword(event.target.value);
        onPasswordChange(newPassword);
    }
    return (
        <input
            type="password"
            className="form-control form-control-user"
            value={inputPassword}
            id="exampleInputPassword"
            placeholder="Password"
            onChange={handlePasswordChange}
        />
    );
}
