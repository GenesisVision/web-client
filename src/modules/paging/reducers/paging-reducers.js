import { composePaingActionType } from "../helpers/paging-helpers";

export const dafaultState = {
  currentPage: 0,
  itemsOnPage: 10,
  totalPages: 0
};

const pagingReducerFactory = ({ type, paging }) => {
  const initialState = { ...dafaultState, ...paging };
  const pagingActionType = composePaingActionType(type);
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
