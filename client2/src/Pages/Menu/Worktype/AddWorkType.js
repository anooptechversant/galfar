import { React, useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getWorkTypeData } from "../../../Actions/workTypeActions";

function AddWorkType() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Work Type",
    update: "Update Work Type",
  };
  const data = useSelector((state) => state);
   const successStatusData = data.workType.workTypeSuccess;
   const errorStatusData = data.workType.workTypeError;
  const [inputWorkType, setInputWorkType] = useState({
    worktype: "",
  });
  const [validationError, setValidationError] = useState({
    worktype: "",
  });
  const responseMessage = {
    insert: "Work type successfully added",
    update: "Work type Updated Successfully",
  };
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState(data);
  useEffect(() => {
    if (inputWorkType.worktype == "") {
      setValidationError({ worktype: "Required Field" });
    }
  }, [inputWorkType]);
  useEffect(() => {
    if (editData[0] != null) {
      setValidationError({ worktype: "" });
    }
  }, [editData]);
  const handleWorkTypeChange = (newWorkType) => {
    setInputWorkType((prevState) => ({
      ...prevState,
      [newWorkType.name]: newWorkType.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newWorkType.name]: newWorkType.value != "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddWorkType = (type) => {
    if (type == "save") {
      dispatch(getWorkTypeData("insert", inputWorkType, 0));
      // setInputWorkType("");
    } else if (type == "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getWorkTypeData("update", inputWorkType, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };
 
  useEffect(() => {
    setEditData(data.workType.workTypeData.filter((obj) => obj.id == id));
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
                  Work Type Name <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleWorkTypeChange}
                  propValidationError={validationError.worktype}
                  propAttributeValue='worktype'
                  propValue={editData[0] ? editData[0].worktype : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddWorkType}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWorkType;
