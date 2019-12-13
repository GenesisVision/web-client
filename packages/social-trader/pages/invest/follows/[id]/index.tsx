import withDefaultLayout from "decorators/with-default-layout";
import ProgramDetailsPage from "pages/programs/program-details/program-details.page";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx, ASSET.FOLLOW))
  ]);
  return {};
};

export default compose(withDefaultLayout)(Page);
