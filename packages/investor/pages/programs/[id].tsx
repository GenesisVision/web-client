import React from "react";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
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
import { connect, ResolveThunks } from "react-redux";

const ProgramDetails: NextPageWithRedux<Props, {}> = () => {
  return <ProgramDetailsPage />;
};

ProgramDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(id as string))
  ]);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramId,
      dispatchProgramDescription,
      getProfitChart,
      getBalanceChart
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
)(ProgramDetails);

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramId: typeof dispatchProgramId;
  dispatchProgramDescription: typeof dispatchProgramDescription;
  getProfitChart: typeof getProfitChart;
  getBalanceChart: typeof getBalanceChart;
}

interface Props extends DispatchProps {}
