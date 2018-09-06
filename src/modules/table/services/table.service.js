import { tableActionsFactory } from "../actions/table.actions";
import { composeFilters } from "../helpers/filtering.helpers";
import { calculateSkipAndTake } from "../helpers/paging.helpers";

const tableServiceFactory = ({
  type,
  fetchItems,
  getStorePlace,
  defaultFilters
}) => {
  const tableActions = tableActionsFactory(type);

  const getItems = () => (dispatch, getState) => {
    const filters = composeRequestFilters(getState);
    dispatch(fetchItems(filters));
  };

  const composeRequestFilters = getState => {
    const { paging, sorting, filtering } = getStorePlace(getState());

    const { skip, take } = calculateSkipAndTake(paging);

    const composedFiltering = composeFilters(defaultFilters, filtering);

    const filters = {
      skip,
      take,
      sorting,
      ...composedFiltering
    };

    return filters;
  };

  const changePaging = paging => dispatch => {
    dispatch(tableActions.updatePaging(paging));
    dispatch(getItems());
  };

  const changeSorting = sorting => dispatch => {
    dispatch(tableActions.updateSorting(sorting));
    dispatch(
      tableActions.updatePaging({
        currentPage: 0
      })
    );
    dispatch(getItems());
  };

  const changeFilter = filter => dispatch => {
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
    changePaging,
    changeSorting,
    changeFilter
  };
};

export default tableServiceFactory;
