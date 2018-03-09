import { FILTER } from "../actions/filter-actions.constants";

const initialState = {
  isOpen: false
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        isOpen: action.isOpen
      };
    default:
      return state;
  }
};

export default filterReducer;
