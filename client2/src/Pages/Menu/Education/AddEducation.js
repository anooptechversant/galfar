import React, { useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getEducationData } from "../../../Actions/educationActions";

function AddEducation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Education",
    update: "Update Education",
  };;
  const data = useSelector((state) => state);
 const successStatusData = data.education.educationSuccess;
 const errorStatusData = data.education.educationError;
  const [inputEducation, setInputEducation] = useState({
    qualification: "",
  });
  const [validationError, setValidationError] = useState({
    qualification: "",
  });
  const responseMessage = {
    insert: "Education successfully added",
    update: "Education Updated Successfully",
  };
  const propStatusData = { successStatusData, errorStatusData };
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState(data);
  
  useEffect(() => {
    if (inputEducation.qualification == "") {
      setValidationError({ qualification: "Required Field" });
    }
  }, [inputEducation]);

  useEffect(() => {
    if (editData[0] != null) {
      setValidationError({ qualification: "" });
    }
  }, [editData]);

  const handleEducationChange = (newEducation) => {
    setInputEducation((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value != "" ? "" : "Required Field",
    }));
  };
  console.log("njksnjkbkf", inputEducation);

  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddEducation = (type) => {
    if (type === "save") {
      dispatch(getEducationData("insert", inputEducation, 0));
      // setInputEducation("");
    } else if (type === "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getEducationData("update", inputEducation, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setEditData(data.education.educationData.filter((obj) => obj.id == id));
    if (editData[0]) {
      setInputEducation(editData[0].qualification);
    }
  }, [data]);
  return (
    <div>
      <div className='container-fluid'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <span className='btn  ' onClick={goBack}>
                <i className='fa fa-chevron-left m-0 font-weight-bold '></i>
                <span className='add-label'> Back</span>
              </span>
              <div className='col-md-6'>
                <h1 className='h3 mb-4 text-gray-800'>
                  {editData[0] ? pageTitle.update : pageTitle.create}
                </h1>
              </div>
              <div className='col-md-3'></div>
              <Status
                propResponseMessage={responseMessage}
                propActionType={id !== undefined ? "update" : "insert"}
                propStatusData={propStatusData}
              />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>
                   Qualification <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleEducationChange}
                  propValidationError={validationError.qualification}
                  propAttributeValue='qualification'
                  propValue={editData[0] ? editData[0].qualification : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddEducation}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEducation;
