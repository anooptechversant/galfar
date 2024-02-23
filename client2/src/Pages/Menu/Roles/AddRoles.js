import React, { useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getRolesData } from "../../../Actions/rolesActions";
import SelectionInput from "../../../Components/InputComponents/SelectionInput";
import TextArea from "../../../Components/InputComponents/TexrtArea";
const AddRoles = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Role",
    update: "Update Role",
  };
  const data = useSelector((state) => state);
  const successStatusData = data.roles.rolesSuccess;
  const errorStatusData = data.roles.rolesError;
  const [inputRoles, setInputRoles] = useState({
    role: "",
  });
  const [inputType, setInputType] = useState({ type: "" });
  const [inputDescription, setInputDescription] = useState({ description: "" });
  const [validationError, setValidationError] = useState({
    role: "",
    type: "",
    description: "",
  });
  const responseMessage = {
    insert: "Roles successfully added",
    update: "Roles Updated Successfully",
  };
  const typeArray = ["B2B", "B2C"];
  const propStatusData = { successStatusData, errorStatusData };
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState(data);
  console.log(
    "data",
    data.roles.rolesData.filter((obj) => obj.id == id)
  );
  useEffect(() => {
    if (inputRoles.role == "") {
      setValidationError({
        role: "Required Field",
        type: "Required Field",
        description: "Required Field",
      });
    }
  }, [inputRoles]);

  useEffect(() => {
    if (editData[0] != null) {
      setValidationError({
        role: " ",
        type: " ",
        description: " ",
      });
    }
  }, [editData]);

  const handleRolesChange = (newRoles) => {
    setInputRoles((prevState) => ({
      ...prevState,
      [newRoles.name]: newRoles.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newRoles.name]: newRoles.value != "" ? "" : "Required Field",
    }));
  };
  const handleDescriptionChange = (newDescription) => {
    setInputDescription((prevState) => ({
      ...prevState,
      [newDescription.name]: newDescription.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newDescription.name]: newDescription.value != "" ? "" : "Required Field",
    }));
  };
  const handleTypeChange = (newType) => {
    setInputType((prevState) => ({
      ...prevState,
      [newType.name]: newType.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newType.name]: newType.value != "" ? "" : "Required Field",
    }));
  };

  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);

  const handleAddRoles = (type) => {
    if (type === "save") {
      const inputData = {
        role: inputRoles.role,
        description: inputDescription.description,
        type: inputType.type,
      };
      dispatch(getRolesData("insert", inputData, 0));
      // setInputRoles("");
    } else if (type === "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        const inputData = {
          role: inputRoles.role,
          description: inputDescription.description,
          type: inputType.type,
        };
        dispatch(getRolesData("update", inputData, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setEditData(data.roles.rolesData.filter((obj) => obj.id == id));
    if (editData[0]) {
      setInputRoles({ role: editData[0].role });
      setInputType({ type: editData[0].type });
      setInputDescription({ description: editData[0].description });
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
                  Name of Role <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleRolesChange}
                  propValidationError={validationError.role}
                  propAttributeValue='role'
                  propValue={editData[0] ? editData[0].role : ""}
                />{" "}
                <label>
                  Description <span className='errorLabel'>*</span>
                </label>
                <TextArea
                  propOnChange={handleDescriptionChange}
                  propValidationError={validationError.description}
                  propAttributeValue='description'
                  propValue={editData[0] ? editData[0].description : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  Type <span className='errorLabel'>*</span>
                </label>
                <SelectionInput
                  propOnChange={handleTypeChange}
                  propValidationError={validationError.type}
                  propAttributeValue='type'
                  options={typeArray}
                  propValue={editData[0] ? editData[0].type : ""}
                />{" "}
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddRoles}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
