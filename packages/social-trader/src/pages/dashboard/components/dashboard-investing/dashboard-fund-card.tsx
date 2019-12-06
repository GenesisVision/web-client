import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn,
  TableCardTableRow
} from "components/table/components/table-card/table-card";
import { FundInvestingDetailsList } from "gv-api-web";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { ASSET, FUND_CURRENCY } from "shared/constants/constants";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { VoidFuncType } from "utils/types";

const _DashboardFundCard: React.FC<Props> = ({
  updateItems,
  fund,
  toggleFavorite,
  title = ""
}) => {
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
      color={fund.color}
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
              assets={fund.topFundAssets as FundAssetType[]}
              type={FUND_ASSET_TYPE.SHORT}
              size={3}
              length={fund.totalAssetsCount}
            />
          )}
        </TableCardTableRow>
      </TableCardTable>
      <DepositWithdrawButtons
        onApply={updateItems}
        canWithdraw={fund.personalDetails.canWithdraw}
        canInvest={fund.personalDetails.canInvest}
        broker={""}
        type={ASSET.FUND}
        id={fund.id}
        currency={FUND_CURRENCY}
      />
    </TableCard>
  );
};

const DashboardFundCard = React.memo(_DashboardFundCard);
export default DashboardFundCard;

interface Props {
  updateItems: VoidFuncType;
  fund: FundInvestingDetailsList;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title?: string;
}
