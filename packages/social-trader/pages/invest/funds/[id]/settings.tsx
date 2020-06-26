import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { checkClosed } from "modules/asset-settings/services/asset-settings.service";
import {
  dispatchFundDescription,
  dispatchFundId
} from "pages/invest/funds/fund-details/services/fund-details.service";
import FundSettingsPage from "pages/invest/funds/fund-settings/fund-settings.page";
import React from "react";
import { compose } from "redux";
import { getAccountCurrency } from "utils/account-currency";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <FundSettingsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const currency = getAccountCurrency(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx, currency))
  ]).then(([id, description]) => {
    if (checkClosed(description.value.publicInfo.status))
      throw "Fund is closed";
  });
  return {
    namespacesRequired: ["form-fields", "asset-settings", "fund-settings"]
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
