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
import { activeMenuActions } from "../../../Actions/activeMenuActions";
import Options from "../../../Components/InputComponents/Options";

function SliderImage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add SliderImage",
    update: "Update SliderImage",
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
  const [optionData, setOptionData] = useState([]);
  const [sliderInputData, setSliderInputData] = useState([]);
  const [sliderImageData, setSliderImageData] = useState([]);
  const [imageLoopArray,setImageLoopArray] = useState(0);
  const [inputSlider, setInputSlider] = useState({
    slider: "",
    sliderID: ""
  });
  const [validationError, setValidationError] = useState({
    slider: "",
    sliderID : ""
  });
  const responseMessage = {
    insert: "Slider successfully added",
    update: "Slider Updated Successfully",
  };
  const [forceRender, setForceRender] = useState(false);
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
      setEditData(data.slider.sliderData.data)
  }, [data]);
  useEffect(() => {
    if (inputSlider.slider == "") {
        setValidationError((prevData) => ({ ...prevData, slider: "Required Field" }));
    }
    if (inputSlider.sliderID == "") {
        setValidationError((prevData) => ({ ...prevData, sliderID: "Required Field" }));
      }
  }, [inputSlider]);

  const handleSliderChange = (newSubCategory) => {
    setInputSlider((prevState) => ({
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
      dispatch(getSliderData("insert", inputSlider, 0));
      // setInputSlider("");
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
          }));
          setOptionData((prevData) => [ ...newData]);

    }
  }, [data])
  const handleImageChange = (e,id) =>{
    setImageLoopArray(imageLoopArray+1)
    const imgId = imageLoopArray+1;
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setSliderInputData((prevState) => [
      ...prevState,
      { id: imgId, fileURL: previewURL , sliderID : id, files:e.target.files[0]}
    ]);
    setSliderImageData((prevState)=>[
      ...prevState,
      e.target.files[0]
  ]);
  }
  const handleImageDelete = (e,imageID)=>{
    //const updatedImages = editData.images.filter((image) => image.imageID !== id);
    dispatch(getSliderData("delete-image", imageID));
    dispatch(getSliderData("edit", "", id));
  }
  const handleUpdateImageDelete = (e,id)=>{
    const updatedArray = sliderInputData.filter(item => item.id !== id);
    setSliderInputData(updatedArray)
  }
  const handleUpdateClick =(id)=>{
    const formData = new FormData();
    sliderImageData.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append('sliderID', id);
    formData.append("image", sliderImageData);
    dispatch(getSliderData("add-image", formData, id));
  }
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
                  {editData ? pageTitle.update : pageTitle.create}
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
            <div class="container">
              <div class="row">
                {editData !== undefined && editData.images ? (
                  editData.images.map((item, index) => (
                    <div className ="example example-cover">
                      <img className="imageClass" id={`img_${item.imageID}`} src={item.imageUrl}/>
                      <hr/>
                        <i className="fa fa-trash trash-cls" aria-hidden="true" onClick={(e) => handleImageDelete(e, item.imageID)}></i>
                      <hr/>
                    </div>
                  ))
                )
              :null}
              
              {sliderInputData && sliderInputData.length > 0 ? (
              sliderInputData.map((obj) => (
                     <div className ="example example-cover">
                     <img className="imageClass" id={`imgp_${obj.id}`} src={obj.fileURL}/>
                     <hr/>
                       <i className="fa fa-trash trash-cls" aria-hidden="true" onClick={(e) => handleUpdateImageDelete(e,obj.id)}></i>
                     <hr/>
                   </div>
              ))):null}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button type="button" class="btn btn-primary">Add More Images <i class="fa-solid fa-plus"></i></button>
                </div>
                <div className="col-md-6 image-input">
                  <input class="form-control" type="file" id="formFile" onChange={(e) => handleImageChange(e,id)}></input>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <button type='button'className='btn btn-sm btn-primary btn-icon-split save-button'>
                    <span className='icon text-white-50'>
                      <i className='fas fa-save'></i>
                    </span>
                    <span className='text'onClick={() =>handleUpdateClick(editData.id)}>
                      Update
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderImage;
