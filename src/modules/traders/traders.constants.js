export const TRADERS_ROUTE = "/traders";
export const TRADER_ROUTE = `${TRADERS_ROUTE}/:traderId`;

export const TRADER_DEPOSIT_ROUTE = `${TRADER_ROUTE}/:traderId/deposit`;
export const TRADER_WITHDRAW_ROUTE = `${TRADER_ROUTE}/:traderId/withdraw`;

//todo
export const TRADERS_DEPOSIT_ROUTE = `${TRADERS_ROUTE}/deposit/:traderId`;
export const TRADERS_WITHDRAW_ROUTE = `${TRADERS_ROUTE}/withdraw/:traderId`;
