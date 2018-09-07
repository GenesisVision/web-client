import { WalletApi } from "gv-api-web";

import apiClient from "./swagger-custom-client";

const walletApi = new WalletApi(apiClient);

export default walletApi;
