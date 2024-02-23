import { React, useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getSliderData } from "../../../Actions/sliderAction";
import SelectionInput from "../../../Components/InputComponents/SelectionInput";
import TextEditor from "../../../Components/InputComponents/TextEditor";
import { activeMenuActions } from "../../../Actions/activeMenuActions";
import Options from "../../../Components/InputComponents/Options";

function AddSlider() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Slider",
    update: "Update Slider",
  };
  const data = useSelector((state) => state);
  useEffect(() => {
    dispatch(activeMenuActions("sliders"));
    if(id){
        dispatch(getSliderData("edit", "", id));
    }
  }, [dispatch])
  const successStatusData = data.slider.sliderSuccess;
  const errorStatusData = data.slider.sliderError;
  const [validationError, setValidationError] = useState({
    title: "required Field",
    desc:"required Field"
  });
  const responseMessage = {
    insert: "Slider successfully added",
    update: "Slider Updated Successfully",
  };
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
    setEditData(data.slider.sliderData.data)
  }, [data]);
  const [inputSlider, setInputSlider] = useState({
    sliderID: "",
    title: "",
    desc:  "",
    arabicdesc : "",
    arabictitle :  ""
  });
  const handleSliderChange = (newSlider) => {
    setInputSlider((prevState) => ({
      ...prevState,
      [newSlider.name]: newSlider.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newSlider.name]: newSlider.value != "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddSlider = (type) => {
    if (type == "save") {
      dispatch(getSliderData("insert", inputSlider, 0));
      // setInputSubCategory("");
    } else if (type == "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getSliderData("update", inputSlider, id));
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
          }))

    }
  }, [data])
  useEffect(()=>{
    setInputSlider({
      sliderID: "",
      title: editData ? editData.id : "",
      desc:  editData ? editData.decrp : "",
      arabicdesc : editData ? editData.arabicdecrp : "",
      arabictitle : editData ? editData.arabictitle : ""
    })
    setValidationError({
      title : editData && editData.title? "" : "required field",
      desc : editData && editData.decrp ? "" : "required field"
    })
  },[editData])
  const handleVersionChange = (version) => {
    dispatch(getSliderData("edit", "", version));
  }
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
                  {id ? pageTitle.update : pageTitle.create}
                </h1>
              </div>
              <div className="col-md-3">
                <Options
                  propOptionArray = {editData?editData.versionLists : ""}
                  propDefaultValue = {editData?editData.latestVersion : ""}
                  propOnChange={handleVersionChange}
                />
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
                  Title <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleSliderChange}
                  propValidationError={validationError.title}
                  propAttributeValue='title'
                  propValue={editData ? editData.title : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  Arabic Title 
                </label>
                <Text
                  propOnChange={handleSliderChange}
                  propValidationError=""
                  propAttributeValue='arabictitle'
                  propValue={editData ? editData.arabictitle : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  Description <span className='errorLabel'>*</span>
                </label>
                <TextEditor
                  propOnChange={handleSliderChange}
                  propValidationError={validationError.desc}
                  propAttributeValue='desc'
                  propValue={editData ? editData.decrp : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  Arabic Description 
                </label>
                <TextEditor
                  propOnChange={handleSliderChange}
                  propValidationError=""
                  propAttributeValue='arabicdesc'
                  propValue={editData ? editData.arabicdecrp : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddSlider}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSlider;
