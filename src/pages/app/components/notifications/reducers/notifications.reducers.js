import isOpenReducer from "pages/app/components/notifications/reducers/is-open.reducer";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const notificationsReducer = combineReducers({
  notifications: apiReducerFactory({ apiType: "NOTIFICATIONS" }),
  isOpen: isOpenReducer
});

export default notificationsReducer;
