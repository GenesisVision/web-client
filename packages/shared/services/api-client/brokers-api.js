import { BrokersApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const brokersApi = new BrokersApi(apiClient);

export const brokersApiProxy = withApiProxy(brokersApi);
export default brokersApi;
