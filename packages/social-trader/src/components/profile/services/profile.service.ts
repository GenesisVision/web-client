import { api } from "services/api-client/swagger-custom-client";

export const fetchProfile = () => api.profile().getProfileFull();
