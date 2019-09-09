import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import { fetchAccounts } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { CurrencyEnum, NextPageWithRedux } from "shared/utils/types";
import WalletCopytradingAccountContainer from "pages/wallet/components/wallet-copytrading-account-container";

const CopyTradingDetails: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <WalletCopytradingAccountContainer currency={id} />;
};

CopyTradingDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchAccounts(ctx))
  ]);
  return { id };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(CopyTradingDetails);

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends OwnProps {}
