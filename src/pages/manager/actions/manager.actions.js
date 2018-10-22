import ManagersApi from "services/api-client/managers-api";

export const MANAGER_PROFILE = "MANAGER_PROFILE";

export const fetchManagerProfile = managerId =>
  ManagersApi.v10ManagersByIdGet(managerId);
