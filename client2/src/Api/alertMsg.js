import { setAlertMessage } from "../Actions/commonAction";
function AlertMsg() {
  return function (dispatch) {
    dispatch(setAlertMessage())
  };
}

export default AlertMsg;