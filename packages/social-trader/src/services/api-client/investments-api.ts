import { InvestmentsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const investmentsApi: InvestmentsApi = withApiProxy(
  new InvestmentsApi(apiClient)
);
export default investmentsApi;
