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
import { fetchAccounts } from "shared/components/wallet/services/wallet.services";
import WalletCopyTradingAccountContainer
  from "../../../src/pages/wallet/components/wallet-copytrading-account-container";

const CopyTradingDetails: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <WalletCopyTradingAccountContainer currency={id} />;
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      fetchAccounts
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
)(CopyTradingDetails);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchAccounts: typeof fetchAccounts;
}

interface OwnProps {
  id: CurrencyEnum;
}

interface Props extends DispatchProps, OwnProps {}
