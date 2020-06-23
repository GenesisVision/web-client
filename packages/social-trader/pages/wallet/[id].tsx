import platformActions from "actions/platform-actions";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import WalletCurrencyContainer from "pages/wallet/components/wallet-currency.container";
import { fetchWalletsWithCtx } from "pages/wallet/services/wallet.services";
import React from "react";
import { compose } from "redux";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

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
  return { namespacesRequired: ["transfer", "fees", "wallet-page"], id };
};

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends OwnProps {}

export default compose(withDefaultLayout, withPrivateRoute)(Page);
