import React from "react";
import { compose } from "redux";
import FollowNotificationPage from "shared/components/notifications/follow-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchFollowNotifications } from "shared/modules/follow-notifications/services/follow-notifications.services";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FollowNotificationPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  await Promise.all([
    ctx.reduxStore.dispatch(fetchFollowNotifications(id as string, ctx))
  ]);
  return { id };
};

interface Props {
  id: string;
}

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
