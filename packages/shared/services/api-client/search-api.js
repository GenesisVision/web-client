import { SearchApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const searchApi = withApiProxy(new SearchApi(apiClient));

export default searchApi;
