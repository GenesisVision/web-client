import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import { useToLink } from "components/link/link.helper";
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
import { ASSET } from "constants/constants";
import { Currency, FundAssetPercent, FundDetailsListItem } from "gv-api-web";
import * as React from "react";
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
  topFundAssets
}) => {
  const [t] = useTranslation();
  return (
    <TableCardTable wrap>
      <TableCardTableColumn>
        <StatisticItem label={t("funds-page.funds-header.balance")}>
          <NumberFormat
            value={formatCurrencyValue(amount, currency)}
            suffix={` ${currency}`}
            displayType="text"
          />
        </StatisticItem>
      </TableCardTableColumn>
      <TableCardTableColumn>
        <StatisticItem label={t("funds-page.funds-header.investors")}>
          <NumberFormat
            value={investorsCount}
            displayType="text"
            decimalScale={0}
          />
        </StatisticItem>
      </TableCardTableColumn>
      <TableCardTableColumn>
        <StatisticItem label={t("funds-page.funds-header.drawdown")}>
          <NumberFormat
            value={formatValue(drawdown, 2)}
            displayType="text"
            suffix="%"
          />
        </StatisticItem>
      </TableCardTableColumn>
      <TableCardTableRow>
        {topFundAssets && (
          <FundAssetContainer
            noWrap
            assets={topFundAssets as FundAssetType[]}
            type={FUND_ASSET_TYPE.SHORT}
            size={3}
            length={totalAssetsCount}
          />
        )}
      </TableCardTableRow>
    </TableCardTable>
  );
};

const _FundCard: React.FC<Props> = ({ fund }) => {
  const { linkCreator, contextTitle } = useToLink();
  const { t } = useTranslation();
  const link = linkCreator(
    composeFundsDetailsUrl(fund.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={link} onClick={clearAnchor}>
        {t("fund-actions.details")}
      </TableCardActionsItem>
      {fund.personalDetails && (
        <TableCardFavoriteActionItem
          withDispatch
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
}

interface Props {
  fund: FundDetailsListItem;
}
