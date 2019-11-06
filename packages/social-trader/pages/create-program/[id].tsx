import { ProgramDetailsFullOld } from "gv-api-web";
import CreateProgramPage from "pages/create-program/create-program.page";
import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { fetchWalletsWithCtx } from "shared/components/wallet/services/wallet.services";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const CreateProgram: NextPageWithRedux<{}, {}> = () => {
  return <CreateProgramPage />;
};

CreateProgram.getInitialProps = async ctx => {
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx)),
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    ),
    ctx.reduxStore.dispatch(fetchWalletsWithCtx(ctx))
  ]).then(([descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFullOld;
    }).value;
    console.log(description.personalProgramDetails);
    if (
      !description.personalProgramDetails ||
      !description.personalProgramDetails.isOwnProgram
    )
      throw new Error();
  });
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(CreateProgram);
