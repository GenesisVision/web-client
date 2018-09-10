const defaultState = "";

const tableSortingReducer = ({ type, sorting }) => {
  const initialState = sorting || defaultState;
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        return updateSorting(action.payload);
      }
      default:
        return state;
    }
  };
};

export const updateSorting = sorting => {
  return sorting;
};

export default tableSortingReducer;
