import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import React from "react";
import { compose } from "redux";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "shared/components/programs/program-details/services/program-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const ProgramDetails: NextPageWithRedux<{}> = () => {
  return <ProgramDetailsPage />;
};

ProgramDetails.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]);
  return {};
};

export default compose(withDefaultLayout)(ProgramDetails);
