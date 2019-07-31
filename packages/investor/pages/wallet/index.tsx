import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import WalletTotalContainer from "shared/components/wallet/components/wallet-total-container";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { connect, ResolveThunks } from "react-redux";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";

const Wallet: NextPageWithRedux<Props, {}> = () => {
  return <WalletTotalContainer />;
};

Wallet.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchWallets(ctx))]);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchWallets },
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
)(Wallet);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
}

interface Props extends DispatchProps {}
