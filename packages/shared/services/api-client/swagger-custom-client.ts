import { Configuration } from "gv-api-web";

const apiClient = new Configuration({
  basePath: process.env.REACT_APP_API_URL
});

export default apiClient;
