import ManagersApi from "services/api-client/managers-api";

export const MANAGER_PROFILE = "MANAGER_PROFILE";

export const fetchManagerProfile = managerId => ({
  type: MANAGER_PROFILE,
  payload: ManagersApi.v10ManagersByIdGet(managerId)
});
