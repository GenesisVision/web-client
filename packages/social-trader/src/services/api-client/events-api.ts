import { EventsApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const eventsApi: EventsApi = withApiProxy(new EventsApi(apiClient));

export default eventsApi;
