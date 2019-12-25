import { createToUrl } from "components/link/link.helper";
import Page from "components/page/page";
import {
  FollowDetailsListItem,
  FundDetailsListItem,
  ProgramDetailsListItem
} from "gv-api-web";
import FollowCard from "modules/follows-table/components/follow-card";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import { AssetBlock } from "pages/invest/asset-block";
import { InvestAssetsType } from "pages/invest/invest.types";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE
} from "routes/invest.routes";

const _InvestPage: React.FC<Props> = ({
  assets: { follows, funds, programs }
}) => {
  const [t] = useTranslation();
  const title = t("invest.title");
  return (
    <Page title={title}>
      <h1>{title}</h1>
      <AssetBlock
        title={t("invest.follows.title")}
        description={t("invest.follows.text")}
        assets={follows}
        investLink={createToUrl(GV_FOLLOW_ROUTE, GV_FOLLOW_ROUTE, title)}
        renderCard={follow => (
          <FollowCard title={title} follow={follow as FollowDetailsListItem} />
        )}
      />
      <AssetBlock
        side
        title={t("invest.programs.title")}
        description={t("invest.programs.text")}
        assets={programs}
        investLink={createToUrl(GV_PROGRAMS_ROUTE, GV_PROGRAMS_ROUTE, title)}
        renderCard={program => (
          <ProgramCard
            title={title}
            program={program as ProgramDetailsListItem}
          />
        )}
      />
      <AssetBlock
        title={t("invest.funds.title")}
        description={t("invest.funds.text")}
        assets={funds}
        investLink={createToUrl(GV_FUNDS_ROUTE, GV_FUNDS_ROUTE, title)}
        renderCard={fund => (
          <FundCard title={title} fund={fund as FundDetailsListItem} />
        )}
      />
    </Page>
  );
};

interface Props {
  assets: InvestAssetsType;
}

export const InvestPage = React.memo(_InvestPage);
