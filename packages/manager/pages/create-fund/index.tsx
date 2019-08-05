import React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import platformActions from "shared/actions/platform-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

import CreateFundPage from "../../src/pages/create-fund/create-fund.page";
import { fetchMinimumDepositAmount } from "../../src/pages/create-fund/services/create-fund.service";

const CreateFund: NextPageWithRedux<Props, {}> = ({ minimumDepositAmount }) => {
  return <CreateFundPage minimumDepositAmount={minimumDepositAmount} />;
};

CreateFund.getInitialProps = async ctx => {
  let minimumDepositAmount;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWallets(ctx)),
    fetchMinimumDepositAmount(ctx).then(res => (minimumDepositAmount = res))
  ]);
  return { minimumDepositAmount };
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
)(CreateFund);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  fetchWallets: typeof fetchWallets;
}

interface Props extends DispatchProps {
  minimumDepositAmount: number;
}
