import { WalletApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

export const walletApi = new WalletApi(apiClient);

const walletApiProxy = withApiProxy(walletApi);
export default walletApiProxy;
