import { PlatformApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const platformApi = withApiProxy(new PlatformApi(apiClient));

export default platformApi;
