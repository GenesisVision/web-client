import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/constants";

const initialState = {
  isPending: false,
  errorMessage: ""
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isPending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isPending: false,
        errorMessage: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isPending: false,
        errorMessage: action.payload.response.body.errors[0].message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isPending: false
      };
    default:
      return state;
  }
};

export default loginReducer;
