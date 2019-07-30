import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import Page from "shared/components/page/page";
import { getTopPortfolioEvents } from "pages/dashboard/services/dashboard-events.services";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { connect, ResolveThunks } from "react-redux";
import {
  dispatchPlatformLevelsParameters,
  dispatchProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";
import { redirectToLogin } from "shared/components/auth/signin/signin.service";
import { NextPageWithRedux } from "shared/utils/types";
import ProgramDetailsPage from "../../src/pages/programs/program-details/program-details.page";

const ProgramDetails: NextPageWithRedux<Props, {}> = props => {
  console.log(props);
  return <ProgramDetailsPage />;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription,
      redirectToLogin,
      dispatchPlatformLevelsParameters
    },
    dispatch
  )
});

ProgramDetails.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(getTopPortfolioEvents(ctx))]);
  return {};
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDefaultLayout
)(ProgramDetails);

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
  redirectToLogin: typeof redirectToLogin;
  dispatchPlatformLevelsParameters: typeof dispatchPlatformLevelsParameters;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {}
