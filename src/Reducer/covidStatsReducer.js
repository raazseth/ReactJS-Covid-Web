import { covidConstants } from "../Action/constants";

const initState = {
  error: null,
  loading: false,
  overall: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case covidConstants.GET_OVERALL_STATS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case covidConstants.GET_OVERALL_STATS_SUCESS:
      state = {
        ...state,
        overall: action.payload.overall,
      };
      break;
    case covidConstants.GET_OVERALL_STATS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
  }
  return state;
};
