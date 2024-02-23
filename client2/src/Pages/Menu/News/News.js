import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getNewsData } from "../../../Actions/newsAction";
import { activeMenuActions } from "../../../Actions/activeMenuActions";

const News = () => {
  const data = useSelector((state) => state);
  const newsData = data.news.newsData.data;
  const successStatusData = data.news.newsSuccess;
  const errorStatusData = data.news.newsError;
  const loadingNews = data.news.newsLoading;
  const pageTitle = "News";
  const tableTitle = "News";
  const addTableTitle = "Add News";
  const deleteConfirmMessage = "Are you sure you want to delete this news?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const newsColumns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
    { key: "decrp", name: "Description" }

    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNewsDelete = (id) => {
    dispatch(getNewsData("delete", id));
  };

  const handleNewsEdit = (id) => {
    navigate(`/edit-news/${id}`);
  };

  const handleNewsAdd = () => {
    navigate("/add-news");
  };

  useEffect(() => {
    dispatch(activeMenuActions("news"));
    dispatch(getNewsData("fetch"));
  }, [dispatch]);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <NewsTable
          columns={newsColumns}
          Data={newsData}
          propHandleDelete={handleNewsDelete}
          propHandleEdit={handleNewsEdit}
          propHandleAdd={handleNewsAdd}
          propLoading={loadingNews}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
          propAdminprivilage = {true}
          propImageContent = {true}
          propEditImageUrl = "edit-news-images"
        />
      </div>
    </div>
  );
};

export default News;
