import { registerActionTypes } from "../../actions/registerActions/registerActions"

const initialState = {
  isPending: false,
  errorMessage: ''
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerActionTypes.request:
      return {
        ...state,
        isPending: true,
      }
    case registerActionTypes.success:
      return {
        ...state,
        isPending: false,
        errorMessage: ''
      }
    case registerActionTypes.failure:
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
