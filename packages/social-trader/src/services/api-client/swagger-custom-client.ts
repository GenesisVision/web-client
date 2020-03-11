import { ApiClient } from "gv-api-web";
import { getApiUrl } from "utils/config-helpers";

const apiUrl = getApiUrl();

const newClient = new ApiClient(apiUrl);
export default newClient;
