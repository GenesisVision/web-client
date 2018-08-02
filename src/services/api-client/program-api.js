import { ProgramApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const programApi = new ProgramApi(apiClient);

export default programApi;
