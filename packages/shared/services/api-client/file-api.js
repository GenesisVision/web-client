import { FileApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const fileApi = new FileApi(apiClient);

export const fileApiProxy = withApiProxy(fileApi);
export default fileApi;
