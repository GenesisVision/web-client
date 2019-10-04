import { Broker } from "gv-api-web";
import CreateProgramPage from "pages/create-program/create-program.page";
import { fetchBrokers } from "pages/create-program/services/create-program.service";
import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import { fetchWalletsWithCtx } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const CreateProgram: NextPageWithRedux<Props, {}> = ({ brokers }) => {
  return <CreateProgramPage />;
};

CreateProgram.getInitialProps = async ctx => {
  let brokers;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    fetchBrokers().then(res => (brokers = res))
  ]);
  return { brokers };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(CreateProgram);

interface Props {
  brokers: Broker[];
}
