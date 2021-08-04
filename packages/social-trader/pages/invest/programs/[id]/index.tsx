import { setLastModifiedHeader } from "components/assets/asset.helpers";
import { ASSET } from "constants/constants";
import withDefaultLayout from "decorators/with-default-layout";
import { LevelsParamsInfo, ProgramFollowDetailsFull } from "gv-api-web";
import { statisticCurrencyAction } from "pages/invest/programs/program-details/actions/program-details.actions";
import ProgramDetailsPage from "pages/invest/programs/program-details/program-details.page";
import {
  dispatchProgramDescription,
  fetchLevelParameters
} from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import { getAccountCurrency } from "utils/account-currency";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

interface Props {
  levelsParameters: LevelsParamsInfo;
}

const Page: NextPageWithRedux<Props> = ({ levelsParameters }) => {
  return (
    <ProgramDetailsPage
      levelsParameters={levelsParameters}
      route={ASSET.PROGRAM}
    />
  );
};

Page.getInitialProps = async ctx => {
  let programCurrency = "GVT";
  const cookieCurrency = getAccountCurrency(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]).then(([res]) => {
    const {
      tradingAccountInfo: { currency },
      publicInfo
    } = res.value as ProgramFollowDetailsFull;
    setLastModifiedHeader(ctx, publicInfo.lastModified);
    programCurrency = currency;
    ctx.reduxStore.dispatch(statisticCurrencyAction(currency));
  });
  const levelsParameters = await fetchLevelParameters(
    (programCurrency as CurrencyEnum) || cookieCurrency
  );
  return {
    levelsParameters,
    namespacesRequired: [
      "portfolio-events",
      "transfer",
      "asset-details",
      "follow-details-page",
      "program-details-page",
      "about-levels-page"
    ]
  };
};

export default compose(withDefaultLayout)(Page);
