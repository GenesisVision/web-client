import Router from "next/router";
import { FUNDS_ROUTE } from "routes/funds.routes";

export const redirectToFund = (id: string) => {
  Router.replace(`${FUNDS_ROUTE}/${id}`);
};
