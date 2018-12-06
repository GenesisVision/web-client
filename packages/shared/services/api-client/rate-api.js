import { RateApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const rateApi = withApiProxy(new RateApi(apiClient));
export default rateApi;
