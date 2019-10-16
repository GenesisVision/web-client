import React from "react";
import { compose } from "redux";
import FundNotificationPage from "shared/components/notifications/fund-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchFundNotifications } from "shared/modules/fund-notifications/services/fund-notifications.services";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FundNotificationPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  await Promise.all([
    ctx.reduxStore.dispatch(fetchFundNotifications(id as string, ctx))
  ]);
  return { id };
};

export const FundNotifications = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);

interface Props {
  id: string;
}
