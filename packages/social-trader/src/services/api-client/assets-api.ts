import { AssetsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const assetsApi: AssetsApi = withApiProxy(new AssetsApi(apiClient));
export default assetsApi;
