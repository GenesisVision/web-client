import { CLEAR_SUFFIX } from "../../actions/clear-data.factory";

const API_TYPE = "API";
const REQUEST_SUFFIX = "REQUEST";
const SUCCESS_SUFFIX = "SUCCESS";
const FAILURE_SUFFIX = "FAILURE";

const initialState = {
  isPending: false,
  errorMessage: ""
};

const apiReducerFactory = (
  config = {
    apiType: API_TYPE,
    suffixes: [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX]
  }
) => (state = initialState, action) => {
  const apiType = config.apiType || API_TYPE;
  const suffixes = config.suffixes || [
    REQUEST_SUFFIX,
    SUCCESS_SUFFIX,
    FAILURE_SUFFIX,
    CLEAR_SUFFIX
  ];
  const [REQUEST, SUCCESS, FAILURE, CLEAR] = suffixes.map(
    x => `${apiType}_${x}`
  );

  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isPending: true
      };
    case SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        errorMessage: ""
      };
    case FAILURE:
      return {
        ...state,
        isPending: false,
        errorMessage: action.payload
          .filter(x => !x.property)
          .map(x => x.message)
          .join(", ")
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default apiReducerFactory;
