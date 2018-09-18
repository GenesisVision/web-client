import { programsApiProxy } from "services/api-client/programs-api";

export const globalSearchGetPrograms = queryValue => {
  if (queryValue.length === "") return null;
  const filters = {
    mask: queryValue
  };
  return programsApiProxy.v10ProgramsGet(filters);
};
