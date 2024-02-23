import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";

export const getCsrfToken = () => async () => {
  try {
    const usersConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.ACCESS_TOKEN}`,
      }
    };
    const response = await axiosConfig.get(
        c.CSRFTOKEN_URL,
        usersConfig
    );
    console.log(response.data)
    if (response.status === 200) {
        
    }
  } catch (error) {

  }
};
