import { TradingaccountApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const accountsApi: TradingaccountApi = withApiProxy(
  new TradingaccountApi(apiClient)
);

export default accountsApi;
