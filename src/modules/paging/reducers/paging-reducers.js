import { composePaingActionType } from "../helpers/paging-helpers";

const initialState = {
  currentPage: 0,
  itemsOnPage: 10,
  totalPages: 0
};

const pagingReducerFactory = actionType => {
  const pagingActionType = composePaingActionType(actionType);
  return (state = initialState, action) => {
    switch (action.type) {
      case pagingActionType:
        return {
          ...state,
          ...action.paging
        };
      default:
        return state;
    }
  };
};
export default pagingReducerFactory;
