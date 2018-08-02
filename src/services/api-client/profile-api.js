import { ProfileApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const profileApi = new ProfileApi(apiClient);

export default profileApi;
