import { composeFilterPaneActionType } from "../helpers/filter-pane-helpers";

const initialState = {
  isFilterOpen: true
};

const filterPaneReducerFactory = actionType => {
  const filterPaneActionType = composeFilterPaneActionType(actionType);
  return (state = initialState, action) => {
    switch (action.type) {
      case filterPaneActionType:
        return {
          ...state,
          isFilterOpen: action.isOpen
        };
      default:
        return state;
    }
  };
};

export default filterPaneReducerFactory;
