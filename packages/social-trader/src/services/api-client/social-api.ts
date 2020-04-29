import { SocialApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const socialApi: SocialApi = withApiProxy(new SocialApi(apiClient));
export default socialApi;
