import { ManagerApi } from "gv-api-web";
import fetch from "isomorphic-unfetch";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const managerApi: ManagerApi = withApiProxy(
  new ManagerApi(apiClient, undefined, fetch)
);
export default managerApi;
