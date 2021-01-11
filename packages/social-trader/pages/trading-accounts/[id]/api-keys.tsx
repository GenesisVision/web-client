import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { PrivateTradingAccountFull } from "gv-api-web";
import AccountApiKeysPage from "pages/accounts/account-details/account-api-keys/account-api-keys.page";
import { statisticCurrencyAction } from "pages/accounts/account-details/actions/account-details.actions";
import { dispatchAccountDescription } from "pages/accounts/account-details/services/account-details.service";
import React from "react";
import { compose } from "redux";
import { getAccountCurrency } from "utils/account-currency";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <AccountApiKeysPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const cookiesCurrency = getAccountCurrency(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchAccountDescription(id as string)(ctx))
  ]).then(([descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: PrivateTradingAccountFull;
    }).value;
    const statisticCurrency =
      description.tradingAccountInfo.currency || cookiesCurrency;
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(statisticCurrency))
    );
  });
  return {
    namespacesRequired: [
      "api-keys",
      "dashboard-page",
      "portfolio-events",
      "transfer",
      "asset-details",
      "program-details-page",
      "account-details-page"
    ]
  };
};

export default compose(withPrivateRoute, withDefaultLayout)(Page);
