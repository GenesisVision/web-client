import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const isOpenReducer = (isOpen = false, action) => {
  if (action.type === "NOTIFICATIONS_TOGGLE") {
    return !isOpen;
  }
  return isOpen;
};

const notificationsReducer = combineReducers({
  notifications: apiReducerFactory({ apiType: "NOTIFICATIONS" }),
  isOpen: isOpenReducer
});

export default notificationsReducer;
