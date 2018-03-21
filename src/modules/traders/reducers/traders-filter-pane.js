import filterPaneReducerFactory from "../../filter-pane/reducers/filter-pane-reducers";

import { TRADERS } from "../actions/traders-actions.constants";

const tradersFilterPaneReducer = filterPaneReducerFactory(TRADERS);

export default tradersFilterPaneReducer;
