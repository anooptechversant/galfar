import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleTable from "../../../Components/CommonComponents/Table";
import { useNavigate } from "react-router-dom";
import { getRolesData } from "../../../Actions/rolesActions";

const Roles = () => {
  const data = useSelector((state) => state);
  const rolesData = data.roles.rolesData;
  const successStatusData = data.roles.rolesSuccess;
  const errorStatusData = data.roles.rolesError;
  const loadingRoles = data.roles.rolesLoading;
  const pageTitle = "Roles";
  const tableTitle = "Roles";
  const addTableTitle = "Add Roles";
  const deleteConfirmMessage = "Are you sure you want to delete this Data?";
  const responseMessage = {
    success: "Data deleted successfully",
  };
  console.log(data)
  const rolesColumns = [
    { key: "id", name: "ID" },
    { key: "role", name: "Role" },
    { key: "type", name: "Type" },
    { key: "description", name: "Description" },

    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRolesDelete = (id) => {
    dispatch(getRolesData("delete", id));
  };

  const handleRolesEdit = (id) => {
    navigate(`/edit-roles/${id}`);
  };

  const handleRolesAdd = () => {
    navigate("/add-roles");
  };

  useEffect(() => {
    dispatch(getRolesData("fetch"));
  }, [dispatch]);
  console.log(data);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <RoleTable
          columns={rolesColumns}
          Data={rolesData}
          propHandleDelete={handleRolesDelete}
          propHandleEdit={handleRolesEdit}
          propHandleAdd={handleRolesAdd}
          propLoading={loadingRoles}
          propStatusData={{ successStatusData, errorStatusData }}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
        />
      </div>
    </div>
  );
};

export default Roles;
