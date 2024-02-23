
  import {
    setLoading,
    setCommonResponse,
    setCommonResponseFail
  } from "../Actions/commonAction";
function setStoreValues(arg,type) {
  return function (dispatch) {
    if(type === "success")
    {
      dispatch(setCommonResponse(arg));
    }else{
      dispatch(setCommonResponseFail(arg));
    }
  };
}

export default setStoreValues;
