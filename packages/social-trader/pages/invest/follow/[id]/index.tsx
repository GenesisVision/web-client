import { ASSET } from "constants/constants";
import withDefaultLayout from "decorators/with-default-layout";
import ProgramDetailsPage from "pages/invest/programs/program-details/program-details.page";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramDetailsPage route={ASSET.FOLLOW} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx, ASSET.FOLLOW))
  ]);
  return { namespacesRequired: ["follow-details-page"] };
};

export default compose(withDefaultLayout)(Page);
