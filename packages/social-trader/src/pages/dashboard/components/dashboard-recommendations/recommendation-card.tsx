import { GV_BTN_SIZE } from "components/gv-button";
import TableCard from "components/table/components/table-card/table-card";
import DepositButton from "modules/deposit/deposit.button";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import FollowButton from "pages/follows/follow-details/follow-button";
import * as React from "react";
import { ASSET } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "utils/compose-url";

const _RecommendationCard: React.FC<Props> = ({ asset, title }) => {
  const linkProps = {
    pathname: composeProgramDetailsUrl(asset.url),
    state: `/ ${title}`
  };
  return (
    <TableCard
      level={asset.programDetails && asset.programDetails.level}
      levelProgress={asset.programDetails && asset.programDetails.levelProgress}
      assetId={asset.id}
      profit={asset.statistic && asset.statistic.profit}
      chart={asset.statistic && asset.statistic.chart}
      hasAvatar
      title={asset.title}
      logo={asset.logo}
      detailsUrl={linkProps}
    >
      <div className="dashboard-recommendations-card__row">
        {asset.assetType === ASSET.FOLLOW && (
          <FollowButton
            id={asset.id}
            currency={asset.currency}
            title={""}
            isExternal={false}
            broker={asset.broker.type}
            brokerId={asset.broker.name}
            hasSignalAccount={false}
            leverage={1}
          />
        )}
        {(asset.assetType === ASSET.PROGRAM ||
          asset.assetType === ASSET.FUND) && (
          <DepositButton
            size={GV_BTN_SIZE.BIG}
            broker={asset.broker && asset.broker.type}
            type={asset.assetType as ASSET}
            id={asset.id}
            currency={asset.currency}
          />
        )}
      </div>
    </TableCard>
  );
};

interface Props {
  asset: TRecommendation;
  title: string;
}

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
