import { setLastModifiedHeader } from "components/assets/asset.helpers";
import { ASSET } from "constants/constants";
import withDefaultLayout from "decorators/with-default-layout";
import { LevelsParamsInfo, ProgramFollowDetailsFull } from "gv-api-web";
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
      route={ASSET.FOLLOW}
    />
  );
};

Page.getInitialProps = async ctx => {
  let programCurrency = "GVT";
  const cookieCurrency = getAccountCurrency(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx, ASSET.FOLLOW))
  ]).then(([res]) => {
    const {
      tradingAccountInfo: { currency },
      publicInfo
    } = res.value as ProgramFollowDetailsFull;
    setLastModifiedHeader(ctx, publicInfo.lastModified);
    programCurrency = currency;
  });
  const levelsParameters = await fetchLevelParameters(
    (programCurrency as CurrencyEnum) || cookieCurrency
  );
  return {
    levelsParameters,
    namespacesRequired: [
      "about-levels-page",
      "transfer",
      "asset-settings",
      "portfolio-events",
      "asset-details",
      "program-details-page",
      "follow-details-page"
    ]
  };
};

export default compose(withDefaultLayout)(Page);
