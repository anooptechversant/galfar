
import React from "react";
import { useState,useEffect } from "react";

export default function Options(props) {
    const { propOnChange} = props;
    const [transformedArray, settransformedArray] = useState([]);
    const handleVersionChange = (e) => {
        propOnChange(e.target.value)
    }
    useEffect(() => {
        if (Array.isArray(props.propOptionArray)) {
            settransformedArray(
                props.propOptionArray.map(item => ({
                value: item.sliderID,
                label: `Version ${item.version}`
                }))
            )
        }
    }, [props.propOptionArray])
    console.log(props.propDefaultValue)
    return (
        <>
            <select class="form-select" aria-label="Default select example" onChange={handleVersionChange}>
                <option selected>Select Version</option>
                {transformedArray.map((item, index) => (
                    <option key={index} value={item.value}  selected={item.value === props.propDefaultValue}>{item.label}</option>
                ))}
            </select>
        </>
    );
}
