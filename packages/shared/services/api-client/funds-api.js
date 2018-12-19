import { FundsApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";
import withApiProxy from "./api-proxy";

const fundsApi = withApiProxy(new FundsApi(apiClient));

export default fundsApi;
