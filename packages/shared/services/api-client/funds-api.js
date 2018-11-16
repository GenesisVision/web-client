import { FundsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const fundsApi = withApiProxy(new FundsApi(apiClient));

export default fundsApi;
