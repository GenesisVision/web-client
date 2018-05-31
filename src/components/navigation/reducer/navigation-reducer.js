import {
  NAVIGATION_CLOSE,
  NAVIGATION_OPEN
} from "../actions/navigation-actions.constants";

const initialState = { isOpen: false };

function navigationData(state = initialState, action) {
  if (action.type === NAVIGATION_OPEN) {
    return { isOpen: true };
  }
  if (action.type === NAVIGATION_CLOSE) {
    return { isOpen: false };
  }
  return state;
}

export default navigationData;
