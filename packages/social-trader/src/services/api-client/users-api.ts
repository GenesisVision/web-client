import { UsersApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const usersApi: UsersApi = withApiProxy(new UsersApi(apiClient));
export default usersApi;
