import { SearchApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const searchApi = new SearchApi(apiClient);

export const searchApiProxy = withApiProxy(searchApi);
export default searchApi;
