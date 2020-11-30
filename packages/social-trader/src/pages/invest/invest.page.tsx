import { createToUrl } from "components/link/link.helper";
import Page from "components/page/page";
import { Row } from "components/row/row";
import FollowCard from "modules/follows-table/components/follow-card";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import { AssetBlock, DETAILS_BLOCK_TYPE } from "pages/invest/asset-block";
import { InvestAssetsType } from "pages/invest/invest.types";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE
} from "routes/invest.routes";

export const InvestPage: React.FC<Props> = ({
  assets: { follows, funds, programs }
}) => {
  const [t] = useTranslation();
  const title = t("invest:title");
  return (
    <Page description={t("invest:follows.text")} title={title}>
      <Row size={"xlarge"}>
        <AssetBlock
          blockType={DETAILS_BLOCK_TYPE.TRANSPARENT}
          side
          title={t("invest:funds.title")}
          description={t("invest:funds.text")}
          assets={funds}
          investLink={createToUrl(GV_FUNDS_ROUTE, GV_FUNDS_ROUTE, title)}
          renderCard={({ data, index, style }) => (
            <div style={style}>
              <FundCard fund={data[index]} />
            </div>
          )}
        />
      </Row>
      <Row size={"xlarge"}>
        <AssetBlock
          side
          left
          title={t("invest:programs.title")}
          description={t("invest:programs.text")}
          assets={programs}
          investLink={createToUrl(GV_PROGRAMS_ROUTE, GV_PROGRAMS_ROUTE, title)}
          renderCard={({ data, index, style }) => (
            <div style={style}>
              <ProgramCard program={data[index]} />
            </div>
          )}
        />
      </Row>
      <Row size={"xlarge"}>
        <AssetBlock
          buttonLabel={t("invest:follow-button")}
          blockType={DETAILS_BLOCK_TYPE.TRANSPARENT}
          side
          title={t("invest:follows.title")}
          description={t("invest:follows.text")}
          assets={follows}
          investLink={createToUrl(GV_FOLLOW_ROUTE, GV_FOLLOW_ROUTE, title)}
          renderCard={({ data, index, style }) => (
            <div style={style}>
              <FollowCard follow={data[index]} />
            </div>
          )}
        />
      </Row>
    </Page>
  );
};

interface Props {
  assets: InvestAssetsType;
}
