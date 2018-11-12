import { tableActionsFactory } from "../actions/table.actions";

const tableServiceFactory = ({
  type,
  fetchItems,
  getStorePlace,
  defaultFilters
}) => {
  const tableActions = tableActionsFactory(type);

  const getItems = () => (dispatch, getState) => {
    const filters = composeRequestFilters(getState);
    const dispathableAction = fetchItems(filters, getState());
    if (dispathableAction !== null);
    dispatch(dispathableAction);
  };

  const composeRequestFilters = getState => {
    const { paging, sorting, filtering } = getStorePlace(getState());
    return composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });
  };

  const updatePaging = paging => dispatch => {
    dispatch(tableActions.updatePaging(paging));
    dispatch(getItems());
  };

  const updateSorting = sorting => dispatch => {
    dispatch(tableActions.updateSorting(sorting));
    dispatch(
      tableActions.updatePaging({
        currentPage: 0
      })
    );
    dispatch(getItems());
  };

  const updateFilter = filter => dispatch => {
    dispatch(tableActions.updateFilter(filter));
    dispatch(
      tableActions.updatePaging({
        currentPage: 0
      })
    );
    dispatch(getItems());
  };

  return {
    getItems,
    updatePaging,
    updateSorting,
    updateFilter
  };
};

export default tableServiceFactory;
