import { ProgramDetailsFull } from "gv-api-web";
import { statisticCurrencyAction } from "pages/programs/program-details/actions/program-details.actions";
import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]).then(([_, descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFull;
    }).value;
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(description.currency))
    );
  });
  return {};
};

export default compose(withDefaultLayout)(Page);
