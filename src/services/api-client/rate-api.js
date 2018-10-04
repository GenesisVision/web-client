import { RateApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const rateApi = new RateApi(apiClient);

export default rateApi;
