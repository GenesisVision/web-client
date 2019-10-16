import { FundDetails } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import GVButton from "shared/components/gv-button";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import useAnchor from "shared/hooks/anchor.hook";
import {
  composeFundsDetailsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const _FundCard: React.FC<Props> = ({ fund, toggleFavorite, title }) => {
  const { t } = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleToggleFavorite = useCallback(
    () =>
      toggleFavorite(
        fund.id,
        fund.personalDetails && fund.personalDetails.isFavorite
      ),
    [fund.id, fund.personalDetails, toggleFavorite]
  );
  return (
    <div className="table-cards__card">
      <div className="table-cards__row">
        <div className="table-cards__avatar">
          <Link
            to={{
              pathname: composeFundsDetailsUrl(fund.url),
              state: `/ ${title}`
            }}
          >
            <AssetAvatar
              url={fund.logo}
              alt={fund.title}
              color={fund.color}
              size="medium"
            />
          </Link>
        </div>
        <div className="table-cards__main-info">
          <div className="table-cards__title-wrapper">
            <Link
              className="table-cards__title"
              to={{
                pathname: composeFundsDetailsUrl(fund.url),
                state: `/ ${title}`
              }}
            >
              {fund.title}
            </Link>
            <Link
              className="table-cards__name"
              to={{
                pathname: composeManagerDetailsUrl(fund.manager.url),
                state: `/ ${title}`
              }}
            >
              {fund.manager.username}
            </Link>
          </div>
          <div className="table-cards__actions">
            <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
            <Popover
              horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              anchorEl={anchor}
              noPadding
              onClose={clearAnchor}
            >
              <div className="popover-list">
                <Link
                  to={{
                    pathname: composeFundsDetailsUrl(fund.url),
                    state: `/ ${title}`
                  }}
                >
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={clearAnchor}
                  >
                    {t("fund-actions.details")}
                  </GVButton>
                </Link>
                {fund.personalDetails && !fund.personalDetails.isFavorite && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={handleToggleFavorite}
                  >
                    {t("fund-actions.add-to-favorites")}
                  </GVButton>
                )}
                {fund.personalDetails && fund.personalDetails.isFavorite && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={handleToggleFavorite}
                  >
                    {t("fund-actions.remove-from-favorites")}
                  </GVButton>
                )}
              </div>
            </Popover>
          </div>
        </div>
      </div>
      <div className="table-cards__row">
        <div className="table-cards__chart">
          {fund.chart && (
            <ProgramSimpleChart data={fund.chart} programId={fund.id} />
          )}
        </div>
        <div className="table-cards__chart-info">
          <div className="table-cards__profit">
            <Profitability
              value={formatValue(fund.statistic.profitPercent, 2)}
              variant={PROFITABILITY_VARIANT.CHIPS}
              prefix={PROFITABILITY_PREFIX.ARROW}
            >
              <NumberFormat
                value={formatValue(fund.statistic.profitPercent, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </div>
        </div>
      </div>
      <div className="table-cards__table table-cards__table--flex-wrap">
        <div className="table-cards__table-column">
          <StatisticItem label={t("funds-page.funds-header.balance")}>
            <NumberFormat
              value={formatCurrencyValue(
                fund.statistic.balance.amount,
                fund.statistic.balance.currency
              )}
              suffix={` ${fund.statistic.balance.currency}`}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="table-cards__table-column">
          <StatisticItem label={t("funds-page.funds-header.investors")}>
            <NumberFormat
              value={fund.statistic.investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
        </div>
        <div className="table-cards__table-column">
          <StatisticItem label={t("funds-page.funds-header.drawdown")}>
            <NumberFormat
              value={formatValue(fund.statistic.drawdownPercent, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
        </div>
        <div className="table-cards__table-row">
          <FundAssetContainer
            assets={fund.topFundAssets}
            type={FUND_ASSET_TYPE.SHORT}
            size={3}
            length={fund.totalAssetsCount}
          />
        </div>
      </div>
    </div>
  );
};

const FundCard = React.memo(_FundCard);
export default FundCard;

interface Props {
  fund: FundDetails;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title?: JSX.Element | string;
}
