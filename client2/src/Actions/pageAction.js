import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  pageFail,
  pageFetch,
  pageReq,
  pageSuccess
} from "../Features/pageSlice";

export const getPageData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        Authorization: `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(pageReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_PAGE_URL, usersConfig);
      dispatch(pageFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.PAGE_URL,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    } else if (arg === "update") {
      const response = await axiosConfig.put(
        `${c.PAGE_URL}/${id}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    }else if (arg === "edit") {
      const response = await axiosConfig.get(
        `${c.PAGE_URL}/${id}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageFetch(response.data));
      }
    }
    else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.PAGE_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    }
    else if (arg === "add-image"){
      const response = await axiosConfig.post(
        c.PAGE_IMAGE_ADD_URL,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    }
    else if (arg === "update-banner"){
      const response = await axiosConfig.post(
        c.PAGE_IMAGE_BANNER,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    }
    else if (arg === "delete-image") {
      const response = await axiosConfig.delete(
        `${c.PAGE_IMAGE_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(pageSuccess(response));
      }
    }
  } catch (error) {
    dispatch(
      pageFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
