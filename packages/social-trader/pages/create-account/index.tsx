import platformActions from "actions/platform-actions";
import { fetchBrokers } from "components/assets/asset.service";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { Broker } from "gv-api-web";
import { getBrokerFromContext } from "pages/create-account/create-account.helpers";
import CreateAccountPage from "pages/create-account/create-account.page";
import { fetchWalletsWithCtx } from "pages/wallet/services/wallet.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ brokers, requestBrokerName }) => {
  return (
    <CreateAccountPage
      brokers={brokers}
      requestBrokerName={requestBrokerName}
    />
  );
};

Page.getInitialProps = async ctx => {
  const requestBrokerName = getBrokerFromContext(ctx);
  let brokers: Broker[] = [];
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    fetchBrokers().then(res => (brokers = res))
  ]);
  return { brokers, requestBrokerName };
};

interface Props {
  requestBrokerName: string;
  brokers: Broker[];
}

export default compose(withDefaultLayout, withPrivateRoute)(Page);
