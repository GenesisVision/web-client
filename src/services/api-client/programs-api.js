import { ProgramsApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const programsApi = new ProgramsApi(apiClient);

export default programsApi;
