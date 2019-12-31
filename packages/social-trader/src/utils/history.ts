import { createBrowserHistory as createHistory } from "utils/history";

const history = createHistory({ basename: process.env.REACT_ROOT_ROUTE });
export default history;
