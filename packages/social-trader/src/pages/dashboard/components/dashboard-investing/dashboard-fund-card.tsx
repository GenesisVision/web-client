import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn,
  TableCardTableRow
} from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem,
  TableCardFavoriteActionItem
} from "components/table/components/table-card/table-card-actions";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { FundInvestingDetailsList } from "gv-api-web";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { ASSET, FUND_CURRENCY } from "shared/constants/constants";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { VoidFuncType } from "utils/types";

const _DashboardFundCard: React.FC<Props> = ({
  updateRow,
  updateItems,
  fund,
  title = ""
}) => {
  const { t } = useTranslation();
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem
        onClick={clearAnchor}
        to={{
          as: composeFundsDetailsUrl(fund.url),
          pathname: FUND_DETAILS_FOLDER_ROUTE,
          state: `/ ${title}`
        }}
      >
        {t("fund-actions.details")}
      </TableCardActionsItem>
      {fund.personalDetails && (
        <TableCardFavoriteActionItem
          asset={fund}
          updateRow={updateRow}
          assetType={ASSET.FUND}
          id={fund.id}
          isFavorite={fund.personalDetails.isFavorite}
        />
      )}
    </TableCardActions>
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
                fund.personalDetails.value,
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
        title={fund.title}
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
  updateRow?: UpdateRowFuncType;
  updateItems: VoidFuncType;
  fund: FundInvestingDetailsList;
  title?: string;
}
