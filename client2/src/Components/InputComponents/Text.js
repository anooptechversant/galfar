import React from "react";
import { useState, useEffect } from "react";
import "../../Components/CommonComponents/input.css";

export default function Text(props) {
  const { propOnChange, propValidationError, propValue, propAttributeValue } =
    props;
  const [inputText, setInputText] = useState(propValue?propValue:"");
  const [validationError, setValidationError] = useState(false);
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    setInputText(propValue);
  }, [propValue]);

  const handleTextInputChange = (event) => {
    // setValidationError(event.target.value == "" ? "Required Field" : "");
    const newTextInput = event.target.value;
    setInputText(newTextInput);
    propOnChange({ name: event.target.name, value: newTextInput });
  };
  return (
    <div>
      <input
        type='text'
        className='form-control form-control-user'
        value={inputText}
        id='exampleInputText'
        placeholder=''
        onChange={handleTextInputChange}
        name={propAttributeValue}
      />
      {validationError ? (
        <span className='tooltiptext'>{validationError}</span>
      ) : (
        ""
      )}
    </div>
  );
}
