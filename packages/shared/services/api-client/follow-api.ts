import { FollowApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const followApi: FollowApi = withApiProxy(new FollowApi(apiClient));
export default followApi;
