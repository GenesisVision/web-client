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
import { FundDetailsListItem } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { ASSET } from "shared/constants/constants";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

const _FundCard: React.FC<Props> = ({ fund, title = "" }) => {
  const { linkCreator } = useToLink();
  const { t } = useTranslation();
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem
        to={linkCreator(
          composeFundsDetailsUrl(fund.url),
          title,
          FUND_DETAILS_FOLDER_ROUTE
        )}
        onClick={clearAnchor}
      >
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
      detailsUrl={linkCreator(composeFundsDetailsUrl(fund.url), title)}
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
  fund: FundDetailsListItem;
  title?: string;
}
