import { FundsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const fundsApi = new FundsApi(apiClient);

export const fundsApiProxy = withApiProxy(fundsApi);
export default fundsApi;
