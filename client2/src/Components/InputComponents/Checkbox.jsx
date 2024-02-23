
import React from "react";
import { useState } from "react";

export default function Checkbox(props) {
    const { propOnChange} = props;
    const [checkbocValue, setcheckbocValue] = useState(props.propsValue);
    const handleOnChange = (event)=>{
        event.target.checked ? setcheckbocValue(1) :  setcheckbocValue(0) 
        propOnChange(props.propsSection,checkbocValue);
    }
    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" value="" 
                id={`flexCheckDefault ${props.propsLoopValue}`}
                onChange={(event) => handleOnChange(event)}
                checked={checkbocValue === 1 ? true : false}
            />
            <label className="form-check-label" for="flexCheckDefault">
                {props.propsLableTitle}
            </label>
      </div>
    );
}
