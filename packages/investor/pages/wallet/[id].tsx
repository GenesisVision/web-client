import React from "react";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";
import { connect, ResolveThunks } from "react-redux";
import WalletCurrencyContainer from "shared/components/wallet/components/wallet-currency.container";
import platformActions from "shared/actions/platform-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";

const WalletDetails: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <WalletCurrencyContainer currency={id} />;
};

WalletDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWallets(ctx))
  ]);
  return { id };
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
)(WalletDetails);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
}

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends DispatchProps, OwnProps {}
