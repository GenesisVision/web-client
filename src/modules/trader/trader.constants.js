import {TRADERS_ROUTE} from "../traders/traders.constants";

export const TRADER_ROUTE = `${TRADERS_ROUTE}/:traderId`;
export const TRADER_DEPOSIT_ROUTE = `${TRADER_ROUTE}/deposit`;
export const TRADER_WITHDRAW_ROUTE = `${TRADER_ROUTE}/withdraw`;
