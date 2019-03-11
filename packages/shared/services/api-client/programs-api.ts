import { ProgramsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const programsApi: ProgramsApi = withApiProxy(new ProgramsApi(apiClient));

export default programsApi;
