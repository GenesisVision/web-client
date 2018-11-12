import filterPaneReducerFactory from "../../filter-pane/reducers/filter-pane-reducers";

import { PROGRAMS } from "../actions/programs-actions.constants";

const programsFilterPaneReducer = filterPaneReducerFactory(PROGRAMS);

export default programsFilterPaneReducer;
