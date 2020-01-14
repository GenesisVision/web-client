import { createBrowserHistory as createHistory } from "history";

const history = createHistory({ basename: process.env.REACT_ROOT_ROUTE });
export default history;
