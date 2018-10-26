import { ManagerApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const managerApi = new ManagerApi(apiClient);

export default managerApi;
