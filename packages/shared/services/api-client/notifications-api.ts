import { NotificationsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const notificationsApi = withApiProxy(new NotificationsApi(apiClient));
export default notificationsApi;
