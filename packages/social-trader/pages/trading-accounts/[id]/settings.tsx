import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { dispatchAccountDescription } from "pages/accounts/account-details/services/account-details.service";
import AccountSettingsPage from "pages/accounts/account-settings/account-settings.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <AccountSettingsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchAccountDescription(id as string)(ctx))
  ]);
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
