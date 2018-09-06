export const DEFAULT_PAGING = {
  currentPage: 0,
  itemsOnPage: 10,
  totalPages: 0
};
const dafaultState = DEFAULT_PAGING;

const tablePagingReducer = ({ type, paging = {} }) => {
  const initialState = { ...dafaultState, ...paging };
  return (state = initialState, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          ...action.paging
        };
      default:
        return state;
    }
  };
};
export default tablePagingReducer;
