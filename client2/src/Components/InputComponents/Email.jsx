import React, { useState } from "react";

export default function Email(props) {
    const { onEmailChange } = props;
    const [inputEmail,setInputEmail] =  useState("");
    const handleChange = (event) => {
        const newEmail = event.target.value;
        setInputEmail(event.target.value);
        onEmailChange(newEmail);
    }
    return (
        <input
            type="email"
            className="form-control form-control-user"
            value={inputEmail}
            id="exampleInputEmail"
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter Email Address..."
        />
    );
}
