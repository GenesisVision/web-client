import { Action } from "redux";

const isOpenReducer = (isOpen: boolean = false, action: Action): boolean => {
  if (action.type === "NOTIFICATIONS_TOGGLE") {
    return !isOpen;
  }
  return isOpen;
};

export default isOpenReducer;
