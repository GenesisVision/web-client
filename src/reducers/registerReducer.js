import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/registerActions"

const initialState = {
  isPending: false,
  errorMessage: ''
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isPending: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isPending: false,
        errorMessage: ''
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isPending: false,
        errorMessage: action.message
      }
    default:
      return state
  }
}

export default registerReducer
