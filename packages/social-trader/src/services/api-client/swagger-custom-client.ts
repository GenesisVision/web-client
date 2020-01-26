import { ApiClient } from "gv-api-web";

const newClient = new ApiClient(process.env.REACT_APP_API_URL);
export default newClient;
