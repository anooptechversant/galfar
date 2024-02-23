import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import qs from 'qs';
import {
  sliderFail,
  sliderFetch,
  sliderReq,
  sliderSuccess,
} from "../Features/sliderSlice";

export const getSliderData = (arg, data, id) => async (dispatch) => {
  try {
    const usersConfig = {
      headers: {
        Authorization: `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(sliderReq());
    if (arg === "fetch") {
      const response = await axiosConfig.get(c.GET_SLIDER_URL, usersConfig);
      dispatch(sliderFetch(response.data));
    } else if (arg === "insert") {
      const response = await axiosConfig.post(
        c.EDIT_SLIDER_URL,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(sliderSuccess(response));
      }
    } else if (arg === "update") {
        const response = await axiosConfig.put(
          `${c.EDIT_SLIDER_URL}/${id}`,
          data,
          usersConfig
        );
        if (response.status === 200) {
          dispatch(sliderSuccess(response));
        }
    }else if (arg === "edit") {
      const response = await axiosConfig.get(
        `${c.EDIT_SLIDER_URL}/${id}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(sliderFetch(response.data));
      }
    }
    else if (arg === "delete") {
      const response = await axiosConfig.delete(
        `${c.EDIT_SLIDER_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(sliderSuccess(response));
      }
    }
    else if (arg === "delete-image") {
      const response = await axiosConfig.delete(
        `${c.SLIDER_IMAGE_URL}/${data}`,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(sliderSuccess(response));
      }
    }
    else if (arg === "add-image"){
      const response = await axiosConfig.post(
        c.SLIDER_IMAGE_ADD,
        data,
        usersConfig
      );
      if (response.status === 200) {
        dispatch(sliderSuccess(response));
      }
    }
  } catch (error) {
    dispatch(
      sliderFail(
        error.response ? error.response.data.message : "An error occurred"
      )
    );
  }
};
