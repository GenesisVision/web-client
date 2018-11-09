import { createBrowserHistory as createHistory } from "history";

const history = createHistory({ basename: process.env.REACT_APP_BASENAME });
export default history;
