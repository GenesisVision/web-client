import { ProfileApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const profileApi = new ProfileApi(apiClient);

export const profileApiProxy = withApiProxy(profileApi);
export default profileApi;
