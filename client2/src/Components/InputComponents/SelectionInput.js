import React, { useState, useEffect } from "react";

export default function SelectionInput(props) {
  const {
    propOnChange,
    propValidationError,
    propValue,
    propAttributeValue,
    options, // An array of options to choose from
  } = props;

  const [selectedOption, setSelectedOption] = useState("");
  const [validationError, setValidationError] = useState(false);
// console.log(options)
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    setSelectedOption(propValue);
  }, [propValue]);

  const handleSelectionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    propOnChange({ name: event.target.name, value: newSelectedOption });
  };
console.log(validationError)
  return (
    <div>
      <select
        className="form-control form-control-user"
        value={selectedOption}
        onChange={handleSelectionChange}
        name={propAttributeValue}
      >
        <option value="">Select an option</option>
        {options.map((item, index) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
      {validationError ? (
        <span className="tooltiptext">{validationError}</span>
      ) : (
        ""
      )}
    </div>
  );
}
