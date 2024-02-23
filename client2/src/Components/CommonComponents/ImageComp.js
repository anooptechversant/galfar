import React from 'react'
import {useState,useEffect} from "react";
import "../../Pages/Css/menu.css"
import { useDispatch, useSelector } from "react-redux";
import { getPageData } from '../../Actions/pageAction';
import Checkbox from '../InputComponents/Checkbox';

export default function ImageComp(props) {
  const { propOnChange,propOnImageDelete } = props;
  const [imageData, setImageData] = useState(props.Data != undefined && props.Data != "" ? props.Data.images:"");
  const [newImageData, setnewImageData] = useState([]);
  const [ImagesData, setImagesData] = useState([]);
  const [imageLoopArray,setImageLoopArray] = useState(0);
  const image = props.Data != undefined && props.Data != "" ? props.Data.images:"";
  const handleImgUpload = (event) => {
    document.getElementById("fileInput").click();
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    setImageData(props.Data != undefined && props.Data != "" ? props.Data.images:"")
  },[props.Data])
  const handleImageChange = (e) =>{
    setImageLoopArray(imageLoopArray+1)
    const imgId = imageLoopArray+1;
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    setnewImageData((prevState)=>[
      ...prevState,
      { id: imgId,fileURL: previewURL , files:e.target.files[0]}
    ]);
    setImagesData((prevState1)=>[
      ...prevState1,
      file
    ]);
    propOnChange({imgID : imageLoopArray,file : file});
  }
  const handleUpdateImageDelete = (e,id, name)=>{
    const updatedArray = newImageData.filter(item => item.id !== id);
    setnewImageData(updatedArray)
    propOnImageDelete(id);
  }
  const handleImageDelete = (id) => {
    const updatedArray = imageData.filter(item => item.imageID !== id);
    setImageData(updatedArray)
    dispatch(getPageData("delete-image", id));
    window.location.reload();

  }
  const checkBoxChange = (id,val) => {
    const data = {
      id : id,
      val :val == 1 ? 0 : 1
    }
    dispatch(getPageData("update-banner",data))
  }
  return (
    <div>
      <hr/>
      <div className ="example example-cover">
        <div className='row'>
          {imageData && imageData.length > 0 ? (
            imageData.map((item, index) => (
              <div className='imgcls' key={index}>
                <img className="imageClass" id="img" src={item.imageUrl}/>
                <br/>
                <hr/>
                  <Checkbox
                    propsLableTitle = "Banner Image"
                    propOnChange = {checkBoxChange}
                    propsValue = {item.bannerImage}
                    propsSection={item.imageID}
                  />
                <hr/>
                <i className="fa fa-trash trash-cls" aria-hidden="true" onClick={(e) => handleImageDelete(item.imageID)}></i>
              </div>
          ))):(
            <p></p>
          )}
          {newImageData && newImageData.length > 0 ? (
          newImageData.map((item, index) => (
            <div className='imgcls' key={index}>
              <img className="imageClass" id={`imgp_${item.id}`} src={item.fileURL}/>
              <br/>
              <i className="fa fa-trash trash-cls" aria-hidden="true" onClick={(e) => handleUpdateImageDelete(e,item.id,item.name)}></i>
            </div>
          )))
          : (
            <div></div>
          )}
        </div>
          <div className="col-md-12">
            <input type='file' id="fileInput" style={{ display: 'none' }} onChange={(e) => handleImageChange(e)}/>
            <button  type="button" onClick={handleImgUpload} className="btn btn-primary" id="formFile">Upload Image <i class="fa-solid fa-plus"></i></button>
          </div>
      </div>
    </div>
  )
}
