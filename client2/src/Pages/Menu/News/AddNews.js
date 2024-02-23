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
import TextEditor from "../../../Components/InputComponents/TextEditor";
import { activeMenuActions } from "../../../Actions/activeMenuActions";

function AddNews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = {
    create: "Add News",
    update: "Update News",
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
  const [inputNews, setInputNews] = useState({
    newsID: "",
    title: "",
    desc:""
  });
  const [validationError, setValidationError] = useState({
    title: "Required Field",
    desc:"Required Field"
  });
  const responseMessage = {
    insert: "News successfully added",
    update: "News Updated Successfully",
  };
  const propStatusData={successStatusData, errorStatusData }
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState("");
  useEffect(() => {
    if(data.news.newsData.data != undefined){
      setEditData(data.news.newsData.data)
    }
  }, [data]);

  const handleNewsChange = (newNews) => {
    setInputNews((prevState) => ({
      ...prevState,
      [newNews.name]: newNews.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newNews.name]: newNews.value != "" ? "" : "Required Field",
    }));
  };
  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);
  const handleAddNews = (type) => {
    if (type == "save") {
      dispatch(getNewsData("insert", inputNews, 0));
      // setInputSubCategory("");
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
    if(data.news.newsData.data != undefined){
        const newData = data.news.newsData.data.map((item, index) => ({
            key: item.id, // Replace 'ID' with the actual key you want to use
            value: item.news // Replace 'CATEGORY' with the actual key you want to use
          }))

    }
  }, [data]) */
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
                  propOnChange={handleNewsChange}
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
                  propOnChange={handleNewsChange}
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
                  propOnChange={handleNewsChange}
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
                  propOnChange={handleNewsChange}
                  propValidationError=""
                  propAttributeValue='arabicdesc'
                  propValue={editData ? editData.arabicdecrp : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddNews}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNews;
