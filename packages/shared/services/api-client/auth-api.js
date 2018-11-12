import { AuthApi } from "gv-api-web";
import withApiProxy from "./api-proxy";

import apiClient from "./swagger-custom-client";

const authApi = new AuthApi(apiClient);
export const authApiProxy = withApiProxy(authApi);
export default authApi;
