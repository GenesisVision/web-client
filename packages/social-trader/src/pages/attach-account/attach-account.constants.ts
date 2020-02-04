export const ATTACH_ACCOUNT_PAGE_ROUTE = "/attach-account";

export const BROKER_PARAM_NAME = "broker";

export const composeAttachAccountRouteWithBroker = (
  brokerName: string
): string => `${ATTACH_ACCOUNT_PAGE_ROUTE}?${BROKER_PARAM_NAME}=${brokerName}`;
