import CreateFundPage from "pages/create-fund/create-fund.page";
import { fetchMinimumDepositAmount } from "pages/create-fund/services/create-fund.service";
import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";
import { fetchWalletsWithCtx } from "shared/components/wallet/services/wallet.services";

const CreateFund: NextPageWithRedux<Props, {}> = ({ minimumDepositAmount }) => {
  return <CreateFundPage minimumDepositAmount={minimumDepositAmount} />;
};

CreateFund.getInitialProps = async ctx => {
  let minimumDepositAmount;
  await Promise.all([
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx)),
    fetchMinimumDepositAmount(ctx).then(res => (minimumDepositAmount = res))
  ]);
  return { minimumDepositAmount };
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(CreateFund);

interface Props {
  minimumDepositAmount: number;
}
