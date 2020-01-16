import { ApiClient } from "gv-api-web";
import fetch from "isomorphic-unfetch";

const newClient = new ApiClient(process.env.REACT_APP_API_URL, fetch);

export default newClient;
