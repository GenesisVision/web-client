import React from "react";
import { compose } from "redux";
import {
  dispatchProgramDescription,
  dispatchProgramId,
  getBalanceChart,
  getProfitChart
} from "shared/components/programs/program-details/services/program-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

import ProgramDetailsPage from "../../src/pages/programs/program-details/program-details.page";
import { DEFAULT_PERIOD } from "shared/components/chart/chart-period/chart-period.helpers";

const ProgramDetails: NextPageWithRedux<Props, {}> = () => {
  return <ProgramDetailsPage />;
};

ProgramDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(id as string)),
    ctx.reduxStore.dispatch(
      getProfitChart({ id: id as string, period: DEFAULT_PERIOD })
    ),
    ctx.reduxStore.dispatch(
      getBalanceChart({ id: id as string, period: DEFAULT_PERIOD })
    )
  ]);
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramDetails);

interface Props {}
