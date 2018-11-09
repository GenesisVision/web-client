import { InvestorApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const investorApi = new InvestorApi(apiClient);

export const investorApiProxy = withApiProxy(investorApi);
export default investorApi;
