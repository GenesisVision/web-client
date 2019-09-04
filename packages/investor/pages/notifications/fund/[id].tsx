import React from "react";
import { compose } from "redux";
import FundNotificationPage from "shared/components/notifications/fund-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchFundNotifications } from "shared/modules/fund-notifications/services/fund-notifications.services";
import { NextPageWithRedux } from "shared/utils/types";

const FundNotifications: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FundNotificationPage id={id} />;
};

FundNotifications.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  await Promise.all([
    ctx.reduxStore.dispatch(fetchFundNotifications(id as string, ctx))
  ]);
  return { id };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(FundNotifications);

interface Props {
  id: string;
}
