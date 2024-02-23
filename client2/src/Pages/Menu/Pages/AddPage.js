import { React, useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getPageData } from "../../../Actions/pageAction";
import SelectionInput from "../../../Components/InputComponents/SelectionInput";
import { activeMenuActions } from "../../../Actions/activeMenuActions";
import TextEditor from "../../../Components/InputComponents/TextEditor";
import ImageComp from "../../../Components/CommonComponents/ImageComp";

function AddPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add Page",
    update: "Update Page",
  };
  const data = useSelector((state) => state);
  useEffect(() => {
    dispatch(activeMenuActions("pages"));
    if(id){
        dispatch(getPageData("edit", "", id));
    }else{
      dispatch(getPageData("fetch"));
    }
  }, [dispatch])
  const successStatusData = data.page.pageSuccess;
  const errorStatusData = data.page.pageError;
  const [optionData, setOptionData] = useState([]);
  const [ImagesData, setImagesData] = useState([]);
  const [inputPage, setInputPage] = useState({
    title: "",
    desc: ""
  });
  const [validationError, setValidationError] = useState({
    title: "",
    desc : ""
  });
  const responseMessage = {
    insert: "Page successfully added",
    update: "Page Updated Successfully",
  };
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
      setEditData(data.page.pageData.data)
  }, [data]);
  const handlePageChange = (newPage) => {
    setInputPage((prevState) => ({
      ...prevState,
      [newPage.name]: newPage.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newPage.name]: newPage.value != "" ? "" : "Required Field",
    }));
  };
  const handlePageImageChange = (elements) => {
    setImagesData((prevState)=>[
      ...prevState,
      {id:elements.imgID, file : elements.file}
    ]);
  }
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleImageDelete = (id) => {
    const updatedArray = ImagesData.filter(item => item.id !== id-1);
    setImagesData(updatedArray);
  }
  const handleAddPage = (type) => {
    if (type == "save") {
      dispatch(getPageData("insert", inputPage, 0));
      // setInputSubCategory("");
    } else if (type == "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getPageData("update", inputPage, id));
        const formData = new FormData();
        ImagesData.forEach((image, index) => {
          formData.append(`images[${index}]`, image.file);
        });
        formData.append('pageID', id);
        formData.append("image.file", ImagesData);
        if(ImagesData != ""){
          dispatch(getPageData("add-image", formData, id));
        }
      }
    }
  };
  const goBack = () => {
    window.history.back();
  };
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
                  Title <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handlePageChange}
                  propValidationError={validationError.page}
                  propAttributeValue='title'
                  propValue={editData ? editData.title : ""}
                />
              </div>
              <div className='col-md-6'>
                <label>
                  Arabic Title
                </label>
                <Text
                  propOnChange={handlePageChange}
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
                  propOnChange={handlePageChange}
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
                  propOnChange={handlePageChange}
                  propValidationError=""
                  propAttributeValue='arabicdesc'
                  propValue={editData ? editData.arabicdecrp : ""}
                />
              </div>
              <hr/>
              <div className="col-md-12">
                {editData !== undefined && id ? (
                  <ImageComp 
                    Data={editData}
                    propOnChange={handlePageImageChange}
                    propOnImageDelete ={handleImageDelete}
                  />
                ) : (
                  null
                )}
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddPage}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPage;
