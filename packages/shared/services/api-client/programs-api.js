import { ProgramsApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";
import withApiProxy from "./api-proxy";

const programsApi = withApiProxy(new ProgramsApi(apiClient));

export default programsApi;
