const initialState = {
  isFilterOpen: false
};

const filterPaneReducerFactory = actionType => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionType:
      return {
        ...state,
        isFilterOpen: action.isOpen
      };
    default:
      return state;
  }
};

export default filterPaneReducerFactory;
