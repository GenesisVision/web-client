import { WalletApi } from "gv-api-web";
import withApiProxy from "./api-proxy";

import apiClient from "./swagger-custom-client";

const walletApi = new WalletApi(apiClient);
export const walletApiProxy = withApiProxy(walletApi);
export default walletApi;
