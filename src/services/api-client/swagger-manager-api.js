import { ManagerApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const SwaggerManagerApi = new ManagerApi(apiClient);

export default SwaggerManagerApi;
