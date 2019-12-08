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
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import { FundDetailsList } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

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
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem
        to={{
          as: composeFundsDetailsUrl(fund.url),
          pathname: FUND_DETAILS_FOLDER_ROUTE,
          state: `/ ${title}`
        }}
        onClick={clearAnchor}
      >
        {t("fund-actions.details")}
      </TableCardActionsItem>
      {fund.personalDetails && !fund.personalDetails.isFavorite && (
        <TableCardActionsItem onClick={handleToggleFavorite}>
          {t("fund-actions.add-to-favorites")}
        </TableCardActionsItem>
      )}
      {fund.personalDetails && fund.personalDetails.isFavorite && (
        <TableCardActionsItem onClick={handleToggleFavorite}>
          {t("fund-actions.remove-from-favorites")}
        </TableCardActionsItem>
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
