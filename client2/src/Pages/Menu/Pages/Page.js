import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getPageData } from "../../../Actions/pageAction";
import { activeMenuActions } from "../../../Actions/activeMenuActions";


const Page = () => {
  const data = useSelector((state) => state);
  const pageData = data.page.pageData.data;
  const successStatusData = data.page.pageSuccess;
  const errorStatusData = data.page.pageError;
  const loadingpage = data.page.pageLoading;
  const pageTitle = "Pages";
  const tableTitle = "Pages";
  const addTableTitle = "Add Page";
  const deleteConfirmMessage = "Are you sure you want to delete this page?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const pageColumns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Page Title" },
    { key: "desc", name: "Page Description" }

    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageDelete = (id) => {
    dispatch(getPageData("delete", id));
  };

  const handlePageEdit = (id) => {
    navigate(`/edit-page/${id}`);
  };

  const handlePageAdd = () => {
    navigate("/add-page");
  };

  useEffect(() => {
    dispatch(activeMenuActions("pages"));
    dispatch(getPageData("fetch"));
  }, [dispatch]);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <PageTable
          columns={pageColumns}
          Data={pageData}
          propHandleDelete={handlePageDelete}
          propHandleEdit={handlePageEdit}
          propHandleAdd={handlePageAdd}
          propLoading={loadingpage}
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

export default Page;
