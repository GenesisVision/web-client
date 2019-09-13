import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import WalletCurrencyContainer from "shared/components/wallet/components/wallet-currency.container";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";

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

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(WalletDetails);

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends OwnProps {}
