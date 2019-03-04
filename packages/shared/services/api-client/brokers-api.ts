import { BrokersApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const brokersApi = withApiProxy(new BrokersApi(apiClient));
export default brokersApi;
