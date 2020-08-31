import platformActions from "actions/platform-actions";
import {
  fetchBrokers,
  fetchExchanges,
  GM_DEMO_BROKER_NAME
} from "components/assets/asset.service";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { Broker, ExchangeInfo } from "gv-api-web";
import { getBrokerFromContext } from "pages/create-account/create-account.helpers";
import CreateProgramPage from "pages/create-program/create-program.page";
import { fetchWalletsWithCtx } from "pages/wallet/services/wallet.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

interface Props {
  exchanges: ExchangeInfo[];
  requestBrokerName: string;
  brokers: Broker[];
}

const Page: NextPageWithRedux<Props, {}> = ({
  exchanges,
  brokers,
  requestBrokerName
}) => {
  return (
    <CreateProgramPage
      exchanges={exchanges}
      brokers={brokers}
      requestBrokerName={requestBrokerName}
    />
  );
};

Page.getInitialProps = async ctx => {
  const requestBrokerName = getBrokerFromContext(ctx);
  let serverBrokers: Broker[] = [];
  let exchanges: ExchangeInfo[] = [];
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    fetchExchanges().then(res => (exchanges = res)),
    fetchBrokers().then(res => (serverBrokers = res))
  ]);
  const brokers = serverBrokers.filter(
    ({ name }) => name !== GM_DEMO_BROKER_NAME
  );
  return {
    namespacesRequired: [
      "profile-page",
      "attach-account",
      "form-fields",
      "create-program-page",
      "create-account",
      "asset-settings"
    ],
    exchanges,
    brokers,
    requestBrokerName
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
