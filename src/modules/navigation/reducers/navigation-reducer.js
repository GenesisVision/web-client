import { LOCATION_CHANGE } from "react-router-redux";
import {
  NAVIGATION_CLOSE,
  NAVIGATION_OPEN
} from "../actions/navigation-actions.constants";

const initialState = { isOpen: false };

const navigationData = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_OPEN:
      return { isOpen: true };
    case NAVIGATION_CLOSE:
    case LOCATION_CHANGE:
      return { isOpen: false };
    default:
      return state;
  }
};

export default navigationData;
