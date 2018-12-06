import { FileApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const fileApi = withApiProxy(new FileApi(apiClient));
export default fileApi;
