import { ProgramsApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const programApi = new ProgramsApi(apiClient);

export default programApi;
