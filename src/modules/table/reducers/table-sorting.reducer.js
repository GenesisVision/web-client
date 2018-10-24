const defaultState = "";

const tableSortingReducer = ({ type, sorting }) => {
  const initialState = sorting || defaultState;
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        return action.payload;
      }
      default:
        return state;
    }
  };
};

export default tableSortingReducer;
