import { NotificationsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const notificationsApi = new NotificationsApi(apiClient);

export const notificationsProxyApi = withApiProxy(notificationsApi);
export default notificationsApi;
