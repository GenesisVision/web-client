import history from "../utils/history";

import { HOME_ROUTE } from "../components/app.constants";

const alreadyAuthenticated = () => dispatch => {
  history.push(HOME_ROUTE);
};

const authActions = { alreadyAuthenticated };
export default authActions;
