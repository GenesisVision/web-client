import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import WalletCurrencyContainer from "shared/components/wallet/components/wallet-currency.container";
import { fetchWalletsWithCtx } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <WalletCurrencyContainer currency={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx))
  ]);
  return { id };
};

export const WalletCurrency = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends OwnProps {}
