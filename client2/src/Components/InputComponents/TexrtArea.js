import React, { useState, useEffect } from "react";
import "../../Components/CommonComponents/input.css";

export default function TextArea(props) {
  const { propOnChange, propValidationError, propValue, propAttributeValue } =
    props;
  const [textAreaValue, setTextAreaValue] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    setTextAreaValue(propValue);
  }, [propValue]);

  const handleTextAreaChange = (event) => {
    const newText = event.target.value;
    setTextAreaValue(newText);
    propOnChange({ name: event.target.name, value: newText });
  };

  return (
    <div>
      <textarea
        className='form-control form-control-user'
        value={textAreaValue}
        placeholder=''
        onChange={handleTextAreaChange}
        name={propAttributeValue}
      ></textarea>
      {validationError && (
        <span className='tooltiptext'>{validationError}</span>
      )}
    </div>
  );
}
