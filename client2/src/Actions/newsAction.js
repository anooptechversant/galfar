import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import qs from 'qs';
import {
  newsFail,
  newsFetch,
  newsReq,
  newsSuccess,
} from "../Features/NewsSlice";

export const getNewsData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        Authorization: `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(newsReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_NEWS_URL, usersConfig);
      dispatch(newsFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.EDIT_NEWS_URL,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsSuccess(response));
      }
    } else if (arg === "update") {
        const response = await axiosConfig.put(
          `${c.EDIT_NEWS_URL}/${id}`,
          data,
          usersConfig
        );
        if (response.status === 200) {
          dispatch(newsSuccess(response));
        }
    }else if (arg === "edit") {
      const response = await axiosConfig.get(
        `${c.EDIT_NEWS_URL}/${id}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsFetch(response.data));
      }
    }
    else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.EDIT_NEWS_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsSuccess(response));
      }
    }
    else if  (arg === "news-image-update"){
      const response = await axiosConfig.post(
        `${c.NEWS_IMAGE_DATA_UPDATE}`,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsSuccess(response));
      }
    }
    else if (arg === "delete-image") {
      const response = await axiosConfig.delete(
        `${c.NEWS_IMAGE_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsSuccess(response));
      }
    }
    else if (arg === "add-image"){
      const response = await axiosConfig.post(
        c.NEWS_IMAGE_ADD,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(newsSuccess(response));
      }
    }
  } catch (error) {
    dispatch(
      newsFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
