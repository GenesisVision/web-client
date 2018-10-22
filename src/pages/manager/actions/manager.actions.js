import ManagersApi from "services/api-client/managers-api";
import fundsApi from "services/api-client/funds-api";
import programApi from "services/api-client/programs-api";
import { FUNDS_TABLE } from "../../../modules/funds-table/actions/funds-table.actions";
export const PROGRAMS = "PROGRAMS";

export const MANAGER_PROFILE = "MANAGER_PROFILE";

export const fetchManagerProfile = managerId =>
  ManagersApi.v10ManagersByIdGet(managerId);

export const fetchPrograms = filters => {
  return {
    type: PROGRAMS,
    payload: programApi.v10ProgramsGet(filters)
  };
};

export const fetchFunds = filters => {
  return {
    type: FUNDS_TABLE,
    payload: fundsApi.v10FundsGet(filters)
  };
};
