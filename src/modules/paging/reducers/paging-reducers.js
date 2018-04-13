import { composePaingActionType } from "../helpers/paging-helpers";

import { composeClearDataActionType } from "../../../shared/actions/clear-data.factory";

export const dafaultState = {
  currentPage: 0,
  itemsOnPage: 10,
  totalPages: 0
};

const pagingReducerFactory = ({ type, paging }) => {
  const initialState = { ...dafaultState, ...paging };
  const pagingActionType = composePaingActionType(type);
  const clearDataActionType = composeClearDataActionType(pagingActionType);
  return (state = initialState, action) => {
    switch (action.type) {
      case pagingActionType:
        return {
          ...state,
          ...action.paging
        };
      case clearDataActionType:
        return initialState;
      default:
        return state;
    }
  };
};
export default pagingReducerFactory;
