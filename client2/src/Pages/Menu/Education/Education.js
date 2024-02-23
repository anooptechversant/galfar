import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EducationTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getEducationData } from "../../../Actions/educationActions";

function Education() {
  const data = useSelector((state) => state);
  const educationData = data.education.educationData;
   const successStatusData = data.education.educationSuccess;
   const errorStatusData = data.education.educationError;
  const loadingEducation = data.education.educationLoading;
  const pageTitle = "Education";
  const tableTitle = "Education";
  const addTableTitle = "Add Education";
  const deleteConfirmMessage = "Are you sure you want to delete this Data?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  const educationColumns = [
    { key: "id", name: "ID" },
    { key: "qualification", name: "Qualification" },
    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEducationDelete = (id) => {
    dispatch(getEducationData("delete", id));
  };

  const handleEducationEdit = (id) => {
    navigate(`/edit-education/${id}`);
  };

  const handleEducationAdd = () => {
    navigate("/add-education");
  };

  useEffect(() => {
    dispatch(getEducationData("fetch"));
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <EducationTable
          columns={educationColumns}
          Data={educationData}
          propHandleDelete={handleEducationDelete}
          propHandleEdit={handleEducationEdit}
          propHandleAdd={handleEducationAdd}
          propLoading={loadingEducation}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
        />
      </div>
    </div>
  );
}

export default Education;
