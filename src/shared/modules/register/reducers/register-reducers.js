import * as actionTypes from "../actions/register-actions.constants";

const initialState = {
  isPending: false,
  errorMessage: ""
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isPending: true
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isPending: false,
        errorMessage: ""
      };
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isPending: false,
        errorMessage: action.payload
          .filter(x => !x.property)
          .map(x => x.message)
          .join(", ")
      };
    default:
      return state;
  }
};

export default registerReducer;
