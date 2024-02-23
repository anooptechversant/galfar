import { React, useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getCategoryData } from "../../../Actions/categoryActions";
import { getsubCategoryData } from "../../../Actions/subCategoryAction";
import SelectionInput from "../../../Components/InputComponents/SelectionInput";
import { activeMenuActions } from "../../../Actions/activeMenuActions";

function AddSubCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add SubCategory",
    update: "Update SubCategory",
  };
  const data = useSelector((state) => state);
  useEffect(() => {
    dispatch(activeMenuActions("sub-category"));
    if(id){
        dispatch(getsubCategoryData("edit", "", id));
    }
    dispatch(getCategoryData("fetch"));
  }, [dispatch])
  const successStatusData = data.subCategory.subCategorySuccess;
  const errorStatusData = data.subCategory.subCategoryError;
  const [optionData, setOptionData] = useState([]);
  const [inputSubCategory, setInputSubCategory] = useState({
    subCategory: "",
    categoryID: ""
  });
  const [validationError, setValidationError] = useState({
    subCategory: "",
    categoryID : ""
  });
  const responseMessage = {
    insert: "SubCategory successfully added",
    update: "SubCategory Updated Successfully",
  };
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
    
      setEditData(data.subCategory.subCategoryData.subCategory)

  }, [data]);
  useEffect(() => {
    if (inputSubCategory.subCategory == "") {
        setValidationError((prevData) => ({ ...prevData, subCategory: "Required Field" }));
    }
    if (inputSubCategory.categoryID == "") {
        setValidationError((prevData) => ({ ...prevData, categoryID: "Required Field" }));
      }
  }, [inputSubCategory]);

  const handleSubCategoryChange = (newSubCategory) => {
    setInputSubCategory((prevState) => ({
      ...prevState,
      [newSubCategory.name]: newSubCategory.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newSubCategory.name]: newSubCategory.value != "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddSubCategory = (type) => {
    if (type == "save") {
      dispatch(getsubCategoryData("insert", inputSubCategory, 0));
      // setInputSubCategory("");
    } else if (type == "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getsubCategoryData("update", inputSubCategory, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if(data.category.categoryData.data != undefined){
        const newData = data.category.categoryData.data.map((item, index) => ({
            key: item.id, // Replace 'ID' with the actual key you want to use
            value: item.category // Replace 'CATEGORY' with the actual key you want to use
          }));
          setOptionData((prevData) => [ ...newData]);

    }
  }, [data])
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
                  {editData ? pageTitle.update : pageTitle.create}
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
                  Category <span className='errorLabel'>*</span>
                </label>
                <SelectionInput
                    propOnChange={handleSubCategoryChange}
                    propValidationError={validationError.categoryID}
                    propAttributeValue='categoryID'
                    options={optionData}
                    propValue={editData ? editData.categoryID : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  SubCategory <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleSubCategoryChange}
                  propValidationError={validationError.subCategory}
                  propAttributeValue='subCategory'
                  propValue={editData ? editData.subCategory : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddSubCategory}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
