import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { compose } from "redux";
import { dispatchFundId } from "shared/components/funds/fund-details/services/fund-details.service";
import { NextPageWithRedux } from "shared/utils/types";
import FundDetailsPage from "../../src/pages/funds/fund-details/fund-details.page";
import withPrivateRoute from "shared/decorators/with-private-route";

const FundDetails: NextPageWithRedux<Props, {}> = () => {
  return <FundDetailsPage />;
};

FundDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([ctx.reduxStore.dispatch(dispatchFundId(id as string))]);
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(FundDetails);

interface Props {}
