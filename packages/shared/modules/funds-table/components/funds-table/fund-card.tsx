import { FundDetailsList } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn,
  TableCardTableRow
} from "shared/components/table/components/table-card/table-card";
import { TAnchor, TEvent } from "shared/hooks/anchor.hook";
import { FUND_DETAILS_FOLDER_ROUTE } from "shared/routes/funds.routes";
import { managerToPathCreator } from "shared/routes/manager.routes";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const _FundCard: React.FC<Props> = ({ fund, toggleFavorite, title = "" }) => {
  const { t } = useTranslation();
  const handleToggleFavorite = useCallback(
    () =>
      toggleFavorite(
        fund.id,
        fund.personalDetails && fund.personalDetails.isFavorite
      ),
    [fund.id, fund.personalDetails, toggleFavorite]
  );
  const renderActions = ({
    clearAnchor,
    anchor
  }: {
    clearAnchor: (event: TEvent) => void;
    anchor: TAnchor;
  }) => (
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
            as: composeFundsDetailsUrl(fund.url),
            pathname: FUND_DETAILS_FOLDER_ROUTE,
            state: `/ ${title}`
          }}
        >
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
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
  );
  return (
    <TableCard
      assetId={fund.id}
      profit={fund.statistic.profit}
      chart={fund.statistic.chart}
      hasAvatar
      title={fund.title}
      subTitle={fund.owner.username}
      logo={fund.logo}
      detailsUrl={{
        pathname: composeFundsDetailsUrl(fund.url),
        state: `/ ${title}`
      }}
      managerUrl={managerToPathCreator(fund.owner.url, title)}
      renderActions={renderActions}
    >
      <TableCardTable wrap>
        <TableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.balance")}>
            <NumberFormat
              value={formatCurrencyValue(
                fund.balance.amount,
                fund.balance.currency
              )}
              suffix={` ${fund.balance.currency}`}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.investors")}>
            <NumberFormat
              value={fund.investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.drawdown")}>
            <NumberFormat
              value={formatValue(fund.statistic.drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableRow>
          {fund.topFundAssets && (
            <FundAssetContainer
              assets={fund.topFundAssets}
              type={FUND_ASSET_TYPE.SHORT}
              size={3}
              length={fund.totalAssetsCount}
            />
          )}
        </TableCardTableRow>
      </TableCardTable>
    </TableCard>
  );
};

const FundCard = React.memo(_FundCard);
export default FundCard;

interface Props {
  fund: FundDetailsList;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title?: string;
}
