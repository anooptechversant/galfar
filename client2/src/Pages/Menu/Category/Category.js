import React from "react";
import { useEffect } from "react";
import CategoryTable from "../../../Components/CommonComponents/Table";
import { useDispatch, useSelector } from "react-redux";
//import "../../Css/category.css";
import { useNavigate } from "react-router-dom";
import { getCategoryData } from "../../../Actions/categoryActions";
import { activeMenuActions } from "../../../Actions/activeMenuActions";

function Category() {
  const data = useSelector((state) => state);
  const categoryData = data.category.categoryData.data;
  const successStatusData = data.category.categorySuccess;
  const errorStatusData = data.category.categoryLoading;
  const loadingStatus = data.category.categoryLoading;
  const pageTitle = "Categroy";
  const tableTitle = "Category";
  const addTableTitle = "Add Category";
  const deleteConfirmMessage =
    "Are you sure you want to delete this category?";
  const responseMessage = {
    success: "category deleted successfully",
  };
  const categoryColumns = [
    { key: "id", name: "ID" },
    { key: "category", name: "Category" },
  ];
  const navigate = useNavigate();


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeMenuActions("category"));
    dispatch(getCategoryData("fetch"));
  }, [dispatch]);
  const handleCategoryAdd = () => {
    navigate("/add-category");
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
       <CategoryTable
          columns={categoryColumns}
          Data={categoryData}
          propLoading={loadingStatus}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propHandleAdd={handleCategoryAdd}
          propDeleteMessage={deleteConfirmMessage}
          propHandleDelete=""
          propAdminprivilage = {false}
          propImageContent = {false}
       />

      </div>
    </div>
  );
}

export default Category;
