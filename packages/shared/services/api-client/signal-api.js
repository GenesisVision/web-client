import { SignalApi} from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

export const signalApi = new SignalApi(apiClient);

const signalApiProxy = withApiProxy(signalApi);
export default signalApiProxy;
