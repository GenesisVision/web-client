import { WalletApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const walletApi: WalletApi = withApiProxy(new WalletApi(apiClient));
export default walletApi;
