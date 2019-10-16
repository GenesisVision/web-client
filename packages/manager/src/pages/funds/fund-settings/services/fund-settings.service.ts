import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { RootState } from "shared/reducers/root-reducer";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "shared/routes/funds.routes";
import getParams from "shared/utils/get-params";

export const redirectToFund = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { router } = getState();
  const fundSlugUrl = getParams(router.location.pathname, FUND_DETAILS_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];
  dispatch(push(`${FUNDS_ROUTE}/${fundSlugUrl}`));
};
