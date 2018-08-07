import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import pagingReducerFactory from "../../paging/reducers/paging-reducers";
import { PROGRAMS } from "../actions/programs-actions";
import programsFavoritesReducer from "./programs-favorites-reducer";
import programsFilteringReducer from "./programs-filtering-reducer";
import programsSortingReducer from "./programs-sorting-reducer";

const programsReducer = combineReducers({
  /*tab: "explore",
  facet: "",*/
  items: apiReducerFactory({ apiType: PROGRAMS }, programsFavoritesReducer)
  /*allProgramsGrid: combineReducers({
    filtering: programsFilteringReducer,
    sorting: programsSortingReducer,
    paging: pagingReducerFactory({
      type: PROGRAMS,
      paging: { itemsOnPage: 50 }
    })
  }),
  favoriteProgramsGrid: combineReducers({
    filtering: programsFilteringReducer,
    sorting: programsSortingReducer
  }),
  facetProgramsGrid: combineReducers({
    filtering: programsFilteringReducer,
    sorting: programsSortingReducer
  })*/
});

export default programsReducer;
