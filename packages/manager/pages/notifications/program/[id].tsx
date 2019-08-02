import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { connect, ResolveThunks } from "react-redux";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";
import ProgramNotificationPage from "shared/components/notifications/program-settings.page";
import { fetchProgramNotifications } from "shared/modules/program-notifications/services/program-notifications.services";

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchProgramNotifications },
    dispatch
  )
});

export default compose(
  connect(mapDispatchToProps),
  withDefaultLayout,
  withPrivateRoute
)(ProgramNotifications);

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchProgramNotifications: typeof fetchProgramNotifications;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {
  id: string;
}
