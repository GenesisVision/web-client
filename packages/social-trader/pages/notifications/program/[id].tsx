import ProgramNotificationPage from "components/notifications/program-settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchProgramNotifications } from "modules/program-notifications/services/program-notifications.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <ProgramNotificationPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  await Promise.all([
    ctx.reduxStore.dispatch(fetchProgramNotifications(id as string, ctx))
  ]);
  return { id };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);

interface Props {
  id: string;
}
