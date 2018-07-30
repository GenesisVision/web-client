import { ApiClient } from "gv-api-web";
import { API_VERSION } from "utils/constants";

const apiClient = ApiClient.instance;
apiClient.basePath = process.env.REACT_APP_API_URL;
apiClient.defaultHeaders = {
  "api-version": API_VERSION
};

export default apiClient;
