import ProgramSettingsPage from "pages/invest/programs/programs-settings/program-settings.page";
import React from "react";
import { compose } from "redux";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "shared/components/programs/program-details/services/program-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const ProgramSettings: NextPageWithRedux<void> = () => {
  return <ProgramSettingsPage />;
};

ProgramSettings.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramSettings);
