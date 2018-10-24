import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import tableFiltersReducer from "./table-filters.reducer";

const tableReducerFactory = ({ type, paging, sorting, filtering }) => {
  const tableReducer = {
    itemsData: apiReducerFactory({
      apiType: type
    }),
    filters: tableFiltersReducer({
      type: type + "_FILTERS",
      filters: {
        paging,
        sorting,
        filtering
      }
    })
  };

  return combineReducers({
    ...tableReducer
  });
};

export default tableReducerFactory;
