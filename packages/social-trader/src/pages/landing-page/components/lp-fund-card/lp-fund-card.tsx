import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import { useToLink } from "components/link/link.helper";
import StatisticItem from "components/statistic-item/statistic-item";
import { Currency, FundAssetPercent, FundDetailsListItem } from "gv-api-web";
import LPTableCard, {
  LPTableCardTable,
  LPTableCardTableColumn
} from "pages/landing-page/components/lp-table-card/lp-table-card";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

export const LPFundCardTable: React.FC<ILPFundCardTableProps> = ({
  totalAssetsCount,
  amount,
  currency,
  investorsCount,
  drawdown,
  topFundAssets
}) => {
  const [t] = useTranslation();
  return (
    <>
      <LPTableCardTable wrap>
        <LPTableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.balance")}>
            <NumberFormat
              value={formatCurrencyValue(amount, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </StatisticItem>
        </LPTableCardTableColumn>
        <LPTableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.investors")}>
            <NumberFormat
              value={investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
        </LPTableCardTableColumn>
        <LPTableCardTableColumn>
          <StatisticItem label={t("funds-page.funds-header.drawdown")}>
            <NumberFormat
              value={formatValue(drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
        </LPTableCardTableColumn>
      </LPTableCardTable>
      {topFundAssets && (
        <FundAssetContainer
          noWrap
          assets={topFundAssets as FundAssetType[]}
          type={FUND_ASSET_TYPE.SHORT}
          size={3}
          length={totalAssetsCount}
          lightTheme
        />
      )}
    </>
  );
};

const _LPFundCard: React.FC<Props> = ({ fund }) => {
  const { linkCreator, contextTitle } = useToLink();
  const link = linkCreator(
    composeFundsDetailsUrl(fund.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  return (
    <LPTableCard
      assetId={fund.id}
      profit={fund.statistic.profit}
      chart={fund.statistic.chart}
      title={fund.title}
      subTitle={fund.owner.username}
      logo={fund.logoUrl}
      color={fund.color}
      detailsUrl={link}
      managerUrl={managerToPathCreator(fund.owner.url, contextTitle)}
      whiteTheme
    >
      <LPFundCardTable
        amount={fund.balance.amount}
        currency={fund.balance.currency}
        investorsCount={fund.investorsCount}
        drawdown={fund.statistic.drawdown}
        topFundAssets={fund.topFundAssets}
        totalAssetsCount={fund.totalAssetsCount}
      />
    </LPTableCard>
  );
};

const LPFundCard = React.memo(_LPFundCard);
export default LPFundCard;

interface ILPFundCardTableProps {
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
