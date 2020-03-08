import { Dispatch } from "redux";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const fetchProfileHeaderInfo = (dispatch: Dispatch) => {
  dispatch(fetchProfileHeaderInfoAction());
};
