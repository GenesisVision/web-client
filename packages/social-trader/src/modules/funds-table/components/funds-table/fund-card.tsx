import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem,
  TableCardFavoriteActionItem
} from "components/table/components/table-card/table-card-actions";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import { Currency, FundAssetPercent, FundDetailsListItem } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

export const FundCardTable: React.FC<IFundCardTableProps> = ({
  totalAssetsCount,
  amount,
  currency,
  investorsCount,
  drawdown,
  topFundAssets,
  amountTitle,
  amountTitleTooltip
}) => {
  const [t] = useTranslation();
  return (
    <>
      <TableCardTable wrap>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={
                  amountTitleTooltip || t("funds-page:tooltips.balance")
                }
                labelText={amountTitle || t("header-fields.balance")}
              />
            }
          >
            <NumberFormat
              value={formatCurrencyValue(amount, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t(
                  "dashboard-page:tooltips.investing.investors"
                )}
                labelText={t("header-fields.investors")}
              />
            }
          >
            <NumberFormat
              value={investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.trading.ddown-fund")}
                labelText={t("header-fields.drawdown")}
              />
            }
          >
            <NumberFormat
              value={formatValue(drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </LabeledValue>
        </TableCardTableColumn>
      </TableCardTable>
      {topFundAssets && (
        <FundAssetContainer
          noWrap
          assets={topFundAssets as FundAssetType[]}
          type={"short"}
          size={3}
          length={totalAssetsCount}
        />
      )}
    </>
  );
};

const _FundCard: React.FC<Props> = ({ fund }) => {
  const [fundState, setFundState] = useState(fund);
  const handleUpdateRow = useCallback(fund => {
    setFundState(fund);
  }, []);
  const { linkCreator, contextTitle } = useToLink();
  const { t } = useTranslation();
  const link = linkCreator(
    composeFundsDetailsUrl(fund.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={link} onClick={clearAnchor}>
        {t("asset-actions.details")}
      </TableCardActionsItem>
      {fund.personalDetails && (
        <TableCardFavoriteActionItem
          updateRow={handleUpdateRow}
          asset={fundState}
          assetType={ASSET.FUND}
          id={fund.id}
          isFavorite={fundState.personalDetails.isFavorite}
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
      logo={fund.logoUrl}
      color={fund.color}
      detailsUrl={link}
      managerUrl={managerToPathCreator(fund.owner.url, contextTitle)}
      renderActions={renderActions}
    >
      <FundCardTable
        amount={fund.balance.amount}
        currency={fund.balance.currency}
        investorsCount={fund.investorsCount}
        drawdown={fund.statistic.drawdown}
        topFundAssets={fund.topFundAssets}
        totalAssetsCount={fund.totalAssetsCount}
      />
    </TableCard>
  );
};

const FundCard = React.memo(_FundCard);
export default FundCard;

interface IFundCardTableProps {
  amount: number;
  currency: Currency;
  investorsCount: number;
  totalAssetsCount: number;
  drawdown: number;
  topFundAssets: Array<FundAssetPercent>;
  amountTitle?: string;
  amountTitleTooltip?: string;
}

interface Props {
  fund: FundDetailsListItem;
}
