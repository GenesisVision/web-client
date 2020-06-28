import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { checkClosed } from "modules/asset-settings/services/asset-settings.service";
import { dispatchProgramDescription } from "pages/invest/programs/program-details/service/program-details.service";
import ProgramSettingsPage from "pages/invest/programs/programs-settings/program-settings.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const ProgramSettings: NextPageWithRedux<{}> = () => {
  return <ProgramSettingsPage />;
};

ProgramSettings.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]).then(([description]) => {
    if (checkClosed(description.value.publicInfo.status))
      throw "Program is closed";
  });
  return {
    namespacesRequired: [
      "form-fields",
      "create-program-page",
      "create-account",
      "asset-details",
      "asset-settings"
    ]
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(ProgramSettings);
