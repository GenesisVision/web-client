import { updateFilter } from "shared/components/table/helpers/filtering.helpers";

const defaultState = {};

const tableFilteringReducer = ({ type, filtering = {} }) => {
  const initialState = { ...defaultState, ...filtering };
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        return updateFilter(state, action.payload);
      }

      default:
        return state;
    }
  };
};

export default tableFilteringReducer;
