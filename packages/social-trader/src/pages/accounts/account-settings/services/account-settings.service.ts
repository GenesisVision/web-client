import Router from "next/router";
import { TRADING_ROUTE } from "routes/dashboard.routes";

export const redirectToDashboard = (id: string) => {
  Router.replace(TRADING_ROUTE);
};
