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

interface Props {
  asset: TRecommendation;
  title: string;
}

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
    switch (asset.type) {
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
            currency={asset.currency}
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
      detailsUrl={linkProps}
      pathTitle={title}
      profit={asset.statistic.profit}
      profitPercent={asset.statistic.profitPercent}
    >
      <TableCardRow className="dashboard-recommendations-card__row">
        <GVButton
          className="dashboard-recommendations-card__button"
          onClick={setIsOpenInvestPopup}
        >
          {t(`dashboard-page.recommendations.${asset.type.toLowerCase()}`)}
        </GVButton>
      </TableCardRow>
      {renderDepositContainer()}
    </TableCard>
  );
};

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
