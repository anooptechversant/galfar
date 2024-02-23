import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import setStoreValues from "../../Api/CommonApi";
function Status(props) {
  const { propResponseMessage, propStatusData, propActionType } = props;
  // console.log(propStatusData);
  
  const handleClick = (status) => {
    if (status === "success") {
      // dispatch(setStoreValues(currentStatus, "success"));
    } else {
      // dispatch(setStoreValues(currentStatusFail, "fail"));
    }
  };
  const textColorClass = propStatusData.successStatusData
    ? "text-primary"
    : propStatusData.errorStatusData
    ? "text-danger"
    : "text-primary";
  const borderColorClass = propStatusData.successStatusData
    ? "border-left-primary"
    : propStatusData.errorStatusData
    ? "border-left-danger"
    : "border-left-primary";
  const status = propStatusData.successStatusData
    ? "success"
    : propStatusData.errorStatusData
    ? "fail"
    : "success";
  const iconClass = propStatusData.successStatusData
    ? "fas fa-check"
    : propStatusData.errorStatusData
    ? "fa-exclamation"
    : "fas fa-check";

  return propStatusData.successStatusData || propStatusData.errorStatusData ? (
    <div className='col-md-3 messagecard'>
      <div
        className={`row no-gutters align-items-center ${borderColorClass} shadow h-100 py-2 message-body`}
      >
        <div className='col-auto chck-b'>
          <i className={`${iconClass} fa-2x text-gray-300`}></i>
        </div>
        <div className='col mr-2'>
          <div
            className={`text-xs font-weight-bold ${textColorClass} text-uppercase mb-1`}
          >
            {propStatusData.successStatusData && propActionType === "insert"
              ? propResponseMessage.insert
              : propStatusData.successStatusData && propActionType === "update"
              ? propResponseMessage.update
              : propStatusData.successStatusData && propActionType === "success"
              ? propResponseMessage.success
              : propStatusData.errorStatusData
              ? propStatusData.errorStatusData
              : ""}
          </div>
        </div>
        <i
          className=' fa-2x text-black-300 cursor-s'
          onClick={() => handleClick(status)}
        ></i>
      </div>
    </div>
  ) : null;
}

export default Status;
