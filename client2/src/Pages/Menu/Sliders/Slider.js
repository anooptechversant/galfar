import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getSliderData } from "../../../Actions/sliderAction";
import { activeMenuActions } from "../../../Actions/activeMenuActions";

const Slider = () => {
  const data = useSelector((state) => state);
  const sliderData = data.slider.sliderData.data;
  const successStatusData = data.slider.sliderSuccess;
  const errorStatusData = data.slider.sliderError;
  const loadingSlider = data.slider.sliderLoading;
  const pageTitle = "Slider";
  const tableTitle = "Slider";
  const addTableTitle = "Add Slider";
  const deleteConfirmMessage = "Are you sure you want to delete this slider?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const sliderColumns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
    { key: "decrp", name: "Description" }

    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSliderDelete = (id) => {
    dispatch(getSliderData("delete", id));
  };

  const handleSliderEdit = (id) => {
    navigate(`/edit-slider/${id}`);
  };

  const handleSliderAdd = () => {
    navigate("/add-slider");
  };

  useEffect(() => {
    dispatch(activeMenuActions("sliders"));
    dispatch(getSliderData("fetch"));
  }, [dispatch]);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <SliderTable
          columns={sliderColumns}
          Data={sliderData}
          propHandleDelete={handleSliderDelete}
          propHandleEdit={handleSliderEdit}
          propHandleAdd={handleSliderAdd}
          propLoading={loadingSlider}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
          propAdminprivilage = {true}
          propImageContent = {true}
          propEditImageUrl = "edit-slider-images"
        />
      </div>
    </div>
  );
};

export default Slider;
