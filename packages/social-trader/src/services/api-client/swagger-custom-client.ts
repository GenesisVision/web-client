import { ApiClient } from "gv-api-web";

ApiClient.parseDate = str => {
  return new Date(str);
};

const apiClient = ApiClient.instance;
//@ts-ignore TODO fix types
apiClient.basePath = process.env.REACT_APP_API_URL;

export default apiClient;
