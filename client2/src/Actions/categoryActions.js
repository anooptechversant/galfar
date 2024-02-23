import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  categoryFail,
  categoryFetch,
  categoryReq,
  categorySuccess,
} from "../Features/categorySlice";

export const getCategoryData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        Authorization: `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(categoryReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_CATEGORY_URL, usersConfig);
      dispatch(categoryFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.GET_CATEGORY_URL,
        data,
        usersConfig
      );
      if (response.status === 201) {
        dispatch(categorySuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.GET_CATEGORY_URL}${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(categorySuccess(response));
      }
    } else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_CATEGORY_URL}${data}`,
        usersConfig
      );
      if (response.status === 204) {
        dispatch(categorySuccess(response));
      }
    }
  } catch (error) {
    dispatch(
      categoryFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
