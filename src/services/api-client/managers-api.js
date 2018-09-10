import { ManagersApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const managersApi = new ManagersApi(apiClient);

export default managersApi;
