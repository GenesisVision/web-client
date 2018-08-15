import { PROGRAMS_CHANGE_TAB } from "modules/favorite-program/actions/favorite-program-actions";

const initialState = "explore";

const programsTabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRAMS_CHANGE_TAB:
      return action.payload;
    default:
      return state;
  }
};

export default programsTabsReducer;
