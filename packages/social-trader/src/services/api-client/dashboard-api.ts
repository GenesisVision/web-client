import { DashboardApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const dashboardApi: DashboardApi = withApiProxy(new DashboardApi(apiClient));
export default dashboardApi;
