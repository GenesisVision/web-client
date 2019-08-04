import { Broker } from "gv-api-web";
import React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import platformActions from "shared/actions/platform-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

import CreateProgramPage from "../../src/pages/create-program/create-program.page";
import { fetchBrokers } from "../../src/pages/create-program/services/create-program.service";

const CreateProgram: NextPageWithRedux<Props, {}> = ({ brokers }) => {
  return <CreateProgramPage brokers={brokers} />;
};

CreateProgram.getInitialProps = async ctx => {
  let brokers;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWallets(ctx)),
    fetchBrokers().then(res => (brokers = res))
  ]);
  return { brokers };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      fetchWallets
    },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDefaultLayout,
  withPrivateRoute
)(CreateProgram);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
}

interface Props extends DispatchProps {
  brokers: Broker[];
}
