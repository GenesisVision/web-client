import { InvestorApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const investorApi = withApiProxy(new InvestorApi(apiClient));

export default investorApi;
