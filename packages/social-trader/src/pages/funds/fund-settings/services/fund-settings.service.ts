import { push } from "connected-react-router";
import Router from "next/router";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "routes/funds.routes";
import getParams from "utils/get-params";

export const redirectToFund = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const fundSlugUrl = getParams(Router.pathname, FUND_DETAILS_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];
  dispatch(push(`${FUNDS_ROUTE}/${fundSlugUrl}`));
};
