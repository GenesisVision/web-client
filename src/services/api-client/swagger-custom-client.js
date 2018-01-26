import { ApiClient } from "gv-api-web";

export const apiClientPublic = () => {
    const apiClient = ApiClient.instance;
    apiClient.basePath = process.env.REACT_APP_API_URL;
    return apiClient;
};

export const apiClientProtected = token => {
    const apiClient = ApiClient.instance;
    apiClient.basePath = process.env.REACT_APP_API_URL;
    apiClient.authentications = {
        oauth2: {
            type: "oauth2",
            accessToken: token
        }
    };
    return apiClient;
};
