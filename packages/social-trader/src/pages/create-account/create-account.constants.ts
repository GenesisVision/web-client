export const CREATE_ACCOUNT_PAGE_NAME = "create-account";
export const CREATE_ACCOUNT_PAGE_ROUTE = `/${CREATE_ACCOUNT_PAGE_NAME}`;

export const BROKER_PARAM_NAME = "broker";

export const composeCreateAccountRouteWithBroker = (
  brokerName: string
): string => `${CREATE_ACCOUNT_PAGE_ROUTE}?${BROKER_PARAM_NAME}=${brokerName}`;
