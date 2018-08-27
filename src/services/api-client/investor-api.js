import { InvestorApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const investorApi = new InvestorApi(apiClient);

export default investorApi;
