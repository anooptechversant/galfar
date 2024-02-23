import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect } from "react";
import "../../Components/CommonComponents/input.css";

export default function TextEditor(props) {
  const { propOnChange, propValidationError, propValue, propAttributeValue } =
    props;
  const [inputText, setInputText] = useState(propValue?propValue : "");
  const [validationError, setValidationError] = useState(true);
  const editorRef = useRef(null);
  useEffect(() => {
    setValidationError(propValidationError);
  }, [propValidationError]);

  useEffect(() => {
    if(propValue != undefined){
      setInputText(propValue);
    }
  }, [propValue]);
  const handleTextInputChange = (editorName) => {
    setValidationError(editorName == "" ? "Required Field" : "");
    const newTextInput = editorRef.current.getContent();
    //setInputText(newTextInput);
    propOnChange({ name: editorName, value: newTextInput });
  };
  return (
    <div>
    <Editor
        name={propAttributeValue}
        initialValue={inputText ? inputText : ""}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
        height: 500,
        menubar: false,
        plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
        }}
        onKeyUp={() => handleTextInputChange(propAttributeValue)}
    />
      {validationError ? (
        <span className='tooltiptext'>{validationError}</span>
      ) : (
        ""
      )}
    </div>
  );
}
