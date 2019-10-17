import { ProgramDetailsFullOld } from "gv-api-web";
import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import React from "react";
import { compose } from "redux";
import { statisticCurrencyAction } from "shared/components/programs/program-details/actions/program-details.actions";
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
  ]).then(([_, descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFullOld;
    }).value;
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(description.currency))
    );
  });
  return {};
};

export default compose(withDefaultLayout)(ProgramDetails);
