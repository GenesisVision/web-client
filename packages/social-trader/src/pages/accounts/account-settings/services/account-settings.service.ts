import Router from "next/router";
import { TRADING_ROUTE } from "routes/dashboard.routes";

export const redirectToDashboard = () => {
  Router.replace(TRADING_ROUTE);
};
