import ManagerApi from "shared/services/api-client/manager-api";

export const MANAGER_PROFILE = "MANAGER_PROFILE";

export const fetchManagerProfile = managerId =>
  ManagerApi.v10ManagerByIdGet(managerId);
