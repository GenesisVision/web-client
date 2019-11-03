import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import GVButton from "shared/components/gv-button";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

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
    <div className="dashboard-recommendations-card">
      <div className="dashboard-recommendations-card__row">
        <div className="dashboard-recommendations__avatar">
          <Link to={linkProps}>
            <AssetAvatar
              url={asset.logo}
              levelProgress={asset.levelProgress}
              level={asset.level}
              alt={asset.title}
              color={asset.color}
              size="medium"
              tooltip={<LevelTooltip level={asset.level} canLevelUp={false} />}
            />
          </Link>
        </div>
        <div className="dashboard-recommendations-card__main-info">
          <div className="dashboard-recommendations-card__title-wrapper">
            <Link
              className="dashboard-recommendations-card__title"
              to={linkProps}
            >
              {asset.title}
            </Link>
            <div className="dashboard-recommendations-card__type">
              {asset.type}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-recommendations-card__row">
        <div className="dashboard-recommendations-card__chart">
          {asset.chart && (
            <ProgramSimpleChart data={asset.chart} programId={asset.id} />
          )}
        </div>
        <div className="dashboard-recommendations-card__chart-info">
          <div className="dashboard-recommendations-card__profit-percent">
            <Profitability
              value={formatValue(asset.profitPercent, 2)}
              variant={PROFITABILITY_VARIANT.CHIPS}
              prefix={PROFITABILITY_PREFIX.ARROW}
            >
              <NumberFormat
                value={formatValue(asset.profitPercent, 2)}
                suffix=" %"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </div>
          <div className="dashboard-recommendations-card__profit">
            <NumberFormat
              value={formatValue(asset.profit, 2)}
              suffix=" GVT"
              allowNegative={false}
              displayType="text"
            />
          </div>
        </div>
      </div>
      <div className="dashboard-recommendations-card__row">
        <GVButton
          className="dashboard-recommendations-card__button"
          onClick={setIsOpenInvestPopup}
        >
          {t(`dashboard-page.recommendations.${asset.type.toLowerCase()}`)}
        </GVButton>
      </div>
      {renderDepositContainer()}
    </div>
  );
};

const RecommendationCard = React.memo(_RecommendationCard);
export default RecommendationCard;
