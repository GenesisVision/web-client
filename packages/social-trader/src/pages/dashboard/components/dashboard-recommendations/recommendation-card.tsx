import DepositButton from "modules/deposit/deposit.button";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
import TableCard, {
  TableCardRow
} from "shared/components/table/components/table-card/table-card";
import { ASSET } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

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
      <TableCardRow className="dashboard-recommendations-card__row">
        <DepositButton
          broker={"Exante"}
          type={asset.assetType as ASSET}
          id={asset.id}
          currency={"USD"} // {asset.currency}
        />
      </TableCardRow>
    </TableCard>
  );
};

interface Props {
  asset: TRecommendation;
  title: string;
}

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
