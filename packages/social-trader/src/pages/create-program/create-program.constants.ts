export const CREATE_PROGRAM_PAGE_NAME = "create-program";
export const CREATE_PROGRAM_PAGE_ROUTE = `/${CREATE_PROGRAM_PAGE_NAME}`;

export const BROKER_PARAM_NAME = "broker";

export const composeCreateProgramRouteWithBroker = (
  brokerName: string
): string => `${CREATE_PROGRAM_PAGE_ROUTE}?${BROKER_PARAM_NAME}=${brokerName}`;
