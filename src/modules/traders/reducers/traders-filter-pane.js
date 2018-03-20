import filterPaneReducerFactory from "../../filter-pane/reducers/filter-pane-reducers";

import { TRADERS_FILTER_PANE } from "../actions/traders-actions.constants";

const tradersFilterPaneReducer = filterPaneReducerFactory(TRADERS_FILTER_PANE);

export default tradersFilterPaneReducer;
