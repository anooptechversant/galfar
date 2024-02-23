import { React, useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";
import { getNewsData } from "../../../Actions/newsAction";
import SelectionInput from "../../../Components/InputComponents/SelectionInput";
import { activeMenuActions } from "../../../Actions/activeMenuActions";
import TextEditor from "../../../Components/InputComponents/TextEditor";

function NewsImage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add NewsImage",
    update: "Update NewsImage",
  };
  const data = useSelector((state) => state);
    useEffect(() => {
      dispatch(activeMenuActions("news"));
      if(id){
          dispatch(getNewsData("edit", "", id));
      }
  }, [dispatch])
  const successStatusData = data.news.newsSuccess;
  const errorStatusData = data.news.newsError;
  const [optionData, setOptionData] = useState([]);
  const [newsInputData, setNewsInputData] = useState([]);
  const [newsImageData, setNewsImageData] = useState([]);
  const [newsImageDetails,setnewsImageDetails] = useState([]);
  const [imageLoopArray,setImageLoopArray] = useState(0);
  const [inputNews, setInputNews] = useState({
    news: "",
    newsID: ""
  });
  const [validationError, setValidationError] = useState({
    news: "",
    newsID : ""
  });
  const responseMessage = {
    insert: "News successfully added",
    update: "News Updated Successfully",
  };
  const [forceRender, setForceRender] = useState(false);
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
    
      setEditData(data.news.newsData.data)

  }, [data]);
  useEffect(() => {
    if (inputNews.news == "") {
        setValidationError((prevData) => ({ ...prevData, news: "Required Field" }));
    }
    if (inputNews.newsID == "") {
        setValidationError((prevData) => ({ ...prevData, newsID: "Required Field" }));
      }
  }, [inputNews]);

  const handleNewsChange = (newimageval) => {
    setInputNews((prevState) => ({
      ...prevState,
      [newimageval.name]: newimageval.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newimageval.name]: newimageval.value != "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddNewsImage = (type) => {
    if (type == "save") {
      dispatch(getNewsData("insert", inputNews, 0));
      // setInputSlider("");
    } else if (type == "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getNewsData("update", inputNews, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

/*   useEffect(() => {
    if(data.category.categoryData.data != undefined){
        const newData = data.category.categoryData.data.map((item, index) => ({
            key: item.id, // Replace 'ID' with the actual key you want to use
            value: item.category // Replace 'CATEGORY' with the actual key you want to use
          }));
          setOptionData((prevData) => [ ...newData]);

    }
  }, [data]) */
  const handleImageDataChange = (e,id,newsID) => {
    const index = newsImageDetails.findIndex((image) => image.id === id);
    if (index === -1) {
      setnewsImageDetails((prevState) => [
        ...prevState,
        { id, [e.name]: e.value },
      ]);
    } else {
      setnewsImageDetails((prevState) => [
        ...prevState.slice(0, index),
        { ...prevState[index], [e.name]: e.value },
        ...prevState.slice(index + 1),
      ]);
    }
  }
  const handleImageChange = (e,id) =>{
    setImageLoopArray(imageLoopArray+1)
    const imgId = imageLoopArray+1;
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setNewsInputData((prevState) => [
      ...prevState,
      { id: imgId, fileURL: previewURL , newsID : id, files:e.target.files[0]}
    ]);
    setNewsImageData((prevState)=>[
      ...prevState,
      {id:imgId,file:e.target.files[0], newsID : id}
    ]);
  }
  const handleImageDelete = (e,imageID)=>{
    //const updatedImages = editData.images.filter((image) => image.imageID !== id);
    dispatch(getNewsData("delete-image", imageID));
    dispatch(getNewsData("edit", "", id));
  }
  const handleUpdateImageDelete = (e,id)=>{
    const updatedArray = newsInputData.filter(item => item.id !== id);
    setNewsInputData(updatedArray)
  }
  const handleUpdateClick =(id)=>{
    const formData = new FormData();
    newsImageData.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });
    formData.append('newsID', id);
    formData.append("image", newsImageData);

    const formData2 = new FormData();
    newsImageDetails.forEach((item, index) => {
      formData2.append(`images[${index}]`, item);
    });
    dispatch(getNewsData("add-image", formData, id));
    dispatch(getNewsData("news-image-update",newsImageDetails))
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
                    <div className="col-md-6">
                      <div className ="example example-cover">
                        <img className="imageClass" id={`img_${item.imageID}`} src={item.imageUrl}/>
                        <hr/>
                          <i className="fa fa-trash trash-cls" aria-hidden="true" onClick={(e) => handleImageDelete(e, item.imageID)}></i>
                        <hr/>
                        <div className="row">
                          <div className="col-md-6">
                            <Text
                              propOnChange={(e) => handleImageDataChange(e,item.imageID,item.newsID)}
                              propValidationError=""
                              propAttributeValue='imagetitle'
                              propValue={item ? item.imageTitle : ""}
                            />
                            <TextEditor
                              propOnChange={(e) => handleImageDataChange(e,item.imageID,item.newsID)}
                              propValidationError=""
                              propAttributeValue='imagedesc'
                              propValue={item ? item.imageDesc : ""}
                            />
                          </div>
                          <div className="col-md-6">
                            <Text
                              propOnChange={(e) => handleImageDataChange(e,item.imageID,item.newsID)}
                              propValidationError=""
                              propAttributeValue='imagetitlearab'
                              propValue={item ? item.imageTitleArab : ""}
                            />
                            <TextEditor
                              propOnChange={(e) => handleImageDataChange(e,item.imageID,item.newsID)}
                              propValidationError=""
                              propAttributeValue='imagedescarab'
                              propValue={item ? item.imageDescArab : ""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              :null}
              
              {newsInputData && newsInputData.length > 0 ? (
              newsInputData.map((obj) => (
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

export default NewsImage;
