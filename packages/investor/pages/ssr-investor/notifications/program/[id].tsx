import React from "react";
import { compose } from "redux";
import ProgramNotificationPage from "shared/components/notifications/program-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchProgramNotifications } from "shared/modules/program-notifications/services/program-notifications.services";
import { NextPageWithRedux } from "shared/utils/types";

const ProgramNotifications: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <ProgramNotificationPage id={id} />;
};

ProgramNotifications.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  await Promise.all([
    ctx.reduxStore.dispatch(fetchProgramNotifications(id as string, ctx))
  ]);
  return { id };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramNotifications);

interface Props {
  id: string;
}
