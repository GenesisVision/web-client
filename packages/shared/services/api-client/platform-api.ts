import { PlatformApi } from "gv-api-web";
import fetch from "isomorphic-unfetch";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const platformApi: PlatformApi = withApiProxy(
  new PlatformApi(apiClient, undefined, fetch)
);

export default platformApi;
