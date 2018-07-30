import { ApiClient } from "gv-api-web";

const apiClient = ApiClient.instance;
apiClient.basePath = process.env.REACT_APP_API_URL;
apiClient.defaultHeaders = {
  "api-version": "2"
};

export default apiClient;
