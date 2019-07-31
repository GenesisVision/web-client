import { ManagerApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";
import fetch from "isomorphic-unfetch";

const managerApi: ManagerApi = withApiProxy(
  new ManagerApi(apiClient, undefined, fetch)
);
export default managerApi;
