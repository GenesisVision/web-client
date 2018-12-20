import { ProgramsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const programsApi = withApiProxy(new ProgramsApi(apiClient));

export default programsApi;
