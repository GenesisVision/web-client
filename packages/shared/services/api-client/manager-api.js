import { ManagerApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const managerApi = withApiProxy(new ManagerApi(apiClient));

export default managerApi;
