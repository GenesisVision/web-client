import { PartnershipApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const partnershipApi: PartnershipApi = withApiProxy(
  new PartnershipApi(apiClient)
);
export default partnershipApi;
