import { RateApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

export const rateApi = new RateApi(apiClient);
const proxyRateApi = withApiProxy(rateApi);
export default proxyRateApi;
