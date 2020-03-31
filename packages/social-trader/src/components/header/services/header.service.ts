import { api } from "services/api-client/swagger-custom-client";

export const getHeader = () => api.profile().getProfileHeader();
