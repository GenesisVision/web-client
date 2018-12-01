import { RateApi } from "gv-api-web";
import withApiProxy from "./api-proxy";

import apiClient from "./swagger-custom-client";

const rateApi = new RateApi(apiClient);
export const rateApiProxy = withApiProxy(apiClient);
export default rateApi;
