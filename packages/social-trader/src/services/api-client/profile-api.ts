import { ProfileApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const profileApi: ProfileApi = withApiProxy(new ProfileApi(apiClient));
export default profileApi;
