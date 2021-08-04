import { setLastModifiedHeader } from "components/assets/asset.helpers";
import withDefaultLayout from "decorators/with-default-layout";
import { statisticCurrencyAction } from "pages/invest/funds/fund-details/actions/fund-details.actions";
import FundDetailsPage from "pages/invest/funds/fund-details/fund-details.page";
import { dispatchFundDescription } from "pages/invest/funds/fund-details/services/fund-details.service";
import React from "react";
import { compose } from "redux";
import { getAccountCurrency } from "utils/account-currency";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <FundDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const currency = getAccountCurrency(ctx);
  const [_, res] = await Promise.all([
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(currency))
    ),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx, currency))
  ]);

  setLastModifiedHeader(ctx, res.value.publicInfo.lastModified);

  return {
    namespacesRequired: [
      "portfolio-events",
      "asset-details",
      "fund-details-page"
    ]
  };
};
export default compose(withDefaultLayout)(Page);
