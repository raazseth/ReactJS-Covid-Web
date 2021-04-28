import axios from "axios";
import { covidConstants } from "./constants";

export const getCovidOverall = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://api.covid19india.org/data.json");
      dispatch({
        type: covidConstants.GET_OVERALL_STATS_SUCESS,
        payload: { overall: res.data },
      });
    } catch (error) {
      dispatch({
        type: covidConstants.GET_OVERALL_STATS_FAILURE,
        payload: error.response.data,
      });
    }
  };
};
