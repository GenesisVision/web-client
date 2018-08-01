import { AuthApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const authApi = new AuthApi(apiClient);

export default authApi;
