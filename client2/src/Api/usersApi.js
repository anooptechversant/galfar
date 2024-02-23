import c from "../GlobalConstants/URL";
import g from "../GlobalConstants/APIConstants";
import axios from "axios";
function getUsers() {
  const usersConfig = {
    headers: {
      "x-api-key": g.APIKEY,
      Authorization : `Bearer ${g.ACCESTOKEN}`
    }
  };
  return function (dispatch) {
    /*     dispatch(setUserLoading(true));
    dispatch(setUserError(false)); */
    axios.get(c.GETUSERLISTURL, usersConfig).then((response) => {
      if (response.status == 200) {
        // console.log("iojeiodj",response.data);
      }
    });
  };
}

export default getUsers;
