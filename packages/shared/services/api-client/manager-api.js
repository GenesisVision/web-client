import { ManagerApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const managerApi = new ManagerApi(apiClient);

export const managerApiProxy = withApiProxy(managerApi);
export default managerApi;
