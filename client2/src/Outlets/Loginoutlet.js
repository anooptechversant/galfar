import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Util/loginUtil";
function Loginoutlet() {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Loginoutlet;
