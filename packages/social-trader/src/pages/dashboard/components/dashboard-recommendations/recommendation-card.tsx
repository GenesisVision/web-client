import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
import GVButton from "shared/components/gv-button";
import TableCard, {
  TableCardRow
} from "shared/components/table/components/table-card/table-card";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";

const _RecommendationCard: React.FC<Props> = ({ asset, title }) => {
  const [t] = useTranslation();
  const [
    isOpenInvestPopup,
    setIsOpenInvestPopup,
    setIsCloseInvestPopup
  ] = useIsOpen();
  const linkProps = {
    pathname: composeProgramDetailsUrl(asset.url),
    state: `/ ${title}`
  };

  const renderDepositContainer = () => {
    switch (asset.assetType) {
      case ASSET.PROGRAM:
        return (
          <FundDepositContainer
            open={isOpenInvestPopup}
            id={asset.id}
            onClose={setIsCloseInvestPopup}
            onApply={() => {}}
          />
        );
      case ASSET.FUND:
        return (
          <ProgramDeposit
            currency={"GVT"}
            open={isOpenInvestPopup}
            id={asset.id}
            onClose={setIsCloseInvestPopup}
            onApply={() => {}}
          />
        );
    }
  };

  return (
    <TableCard
      asset={asset}
      chart={asset.statistic.chart}
      detailsUrl={linkProps}
      pathTitle={title}
      profit={asset.statistic.profit}
      profitPercent={0}
    >
      <TableCardRow className="dashboard-recommendations-card__row">
        <GVButton
          className="dashboard-recommendations-card__button"
          onClick={setIsOpenInvestPopup}
        >
          {t(`dashboard-page.recommendations.${asset.assetType.toLowerCase()}`)}
        </GVButton>
      </TableCardRow>
      {renderDepositContainer()}
    </TableCard>
  );
};

interface Props {
  asset: TRecommendation;
  title: string;
}

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
