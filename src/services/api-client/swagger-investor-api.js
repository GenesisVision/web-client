import { InvestorApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const SwaggerInvestorApi = new InvestorApi(apiClient);

export default SwaggerInvestorApi;
