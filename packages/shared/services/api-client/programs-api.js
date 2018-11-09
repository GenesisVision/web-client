import { ProgramsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const programsApi = new ProgramsApi(apiClient);

export const programsApiProxy = withApiProxy(programsApi);
export default programsApi;
