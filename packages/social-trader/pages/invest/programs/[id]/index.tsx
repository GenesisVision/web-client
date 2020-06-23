import { ASSET } from "constants/constants";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramFollowDetailsFull } from "gv-api-web";
import { statisticCurrencyAction } from "pages/invest/programs/program-details/actions/program-details.actions";
import ProgramDetailsPage from "pages/invest/programs/program-details/program-details.page";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <ProgramDetailsPage route={ASSET.PROGRAM} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]).then(([_, res]) => {
    const {
      tradingAccountInfo: { currency }
    } = res.value as ProgramFollowDetailsFull;
    ctx.reduxStore.dispatch(statisticCurrencyAction(currency));
  });
  return {
    namespacesRequired: [
      "transfer",
      "asset-details",
      "program-details-page",
      "about-levels-page"
    ]
  };
};

export default compose(withDefaultLayout)(Page);
