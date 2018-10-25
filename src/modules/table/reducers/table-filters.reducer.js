import { merge } from "utils/helpers";

const defaultState = {};

const tableFiltersReducer = ({ type, filters = {} }) => {
  const initialState = { ...defaultState, ...filters };
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        return merge(state, action.payload);
      }

      default:
        return state;
    }
  };
};

export default tableFiltersReducer;
