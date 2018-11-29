import { PlatformApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const platformApi = new PlatformApi(apiClient);

export default platformApi;
