import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { compose } from "redux";
import { dispatchProgramId } from "shared/components/programs/program-details/services/program-details.service";
import { NextPageWithRedux } from "shared/utils/types";
import ProgramDetailsPage from "../../src/pages/programs/program-details/program-details.page";
import withPrivateRoute from "shared/decorators/with-private-route";

const ProgramDetails: NextPageWithRedux<Props, {}> = () => {
  return <ProgramDetailsPage />;
};

ProgramDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([ctx.reduxStore.dispatch(dispatchProgramId(id as string))]);
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramDetails);

interface Props {}
