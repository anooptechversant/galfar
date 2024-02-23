import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubCategoryTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getsubCategoryData } from "../../../Actions/subCategoryAction";
import { activeMenuActions } from "../../../Actions/activeMenuActions";
import { getRefreshToken } from "../../../Actions/loginActions";

const SubCategory = () => {
  const data = useSelector((state) => state);
  const SubCategoryData = data.subCategory.subCategoryData.data;
  const successStatusData = data.subCategory.subCategorySuccess;
  const errorStatusData = data.subCategory.subCategoryError;
  const loadingSubCategory = data.subCategory.subCategoryLoading;
  const pageTitle = "Sub Category";
  const tableTitle = "Sub Category";
  const addTableTitle = "Add Subcategory";
  const deleteConfirmMessage = "Are you sure you want to delete this subcategory?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const subCategoryColumns = [
    { key: "id", name: "ID" },
    { key: "categoryName", name: "Category" },
    { key: "subCategory", name: "Sub Category" }

    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubCategoryDelete = (id) => {
    dispatch(getsubCategoryData("delete", id));
  };

  const handleSubCategoryEdit = (id) => {
    navigate(`/edit-sub-category/${id}`);
  };

  const handleSubCategoryAdd = () => {
    navigate("/add-sub-category");
  };

  useEffect(() => {
    dispatch(activeMenuActions("sub-category"));
    dispatch(getsubCategoryData("fetch"));
  }, [dispatch]);
  const handlerfresh = ()=>{
    dispatch(getRefreshToken());
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
          <button onClick={handlerfresh}>Cick</button>
        </div>
      </div>
      <div>
        <SubCategoryTable
          columns={subCategoryColumns}
          Data={SubCategoryData}
          propHandleDelete={handleSubCategoryDelete}
          propHandleEdit={handleSubCategoryEdit}
          propHandleAdd={handleSubCategoryAdd}
          propLoading={loadingSubCategory}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
          propAdminprivilage = {true}
          propImageContent = {false}
        />
      </div>
    </div>
  );
};

export default SubCategory;
