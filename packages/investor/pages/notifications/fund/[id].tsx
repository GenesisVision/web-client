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
import FundNotificationPage from "shared/components/notifications/fund-settings.page";
import { fetchFundNotifications } from "shared/modules/fund-notifications/services/fund-notifications.services";

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchFundNotifications },
    dispatch
  )
});

export default compose(
  connect(mapDispatchToProps),
  withDefaultLayout,
  withPrivateRoute
)(FundNotifications);

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchFundNotifications: typeof fetchFundNotifications;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {
  id: string;
}
