import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  subCategoryFail,
  subCategoryFetch,
  subCategoryReq,
  subCategorySuccess,
} from "../Features/subCategorySlice";

export const getsubCategoryData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        Authorization: `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(subCategoryReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_SUBCATEGORY_URL, usersConfig);
      dispatch(subCategoryFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.ADD_SUBCATEGORY_URL,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategorySuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.ADD_SUBCATEGORY_URL}/${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategorySuccess(response));
      }
    }else if (arg === "edit") {
      const response = await axiosConfig.get(
        `${c.GET_SUBCATEGORY_EDIT_URL}/${id}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategoryFetch(response.data));
      }
    }
    else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.GET_SUBCATEGORY_EDIT_URL}${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(subCategorySuccess(response));
      }
    }
  } catch (error) {
    dispatch(
      subCategoryFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
