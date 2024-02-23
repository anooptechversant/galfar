import axios from "axios";
import { setData, setError, setLoading } from "../Actions/loginAction";

function getLoginData() {
    return function (dispatch) {
        dispatch(setLoading(true));
        axios
            .get("https://dummyjson.com/products/1")
            .then((response) => {
                dispatch(setData(response.data));
                dispatch(setLoading(false));
            })

            .catch(() => {
                dispatch(setLoading(false));
                dispatch(setError("An error occured"));
            });
    };
}

export default getLoginData;
