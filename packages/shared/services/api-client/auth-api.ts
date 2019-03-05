import { AuthApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const authApi = withApiProxy(new AuthApi(apiClient));
export default authApi;
