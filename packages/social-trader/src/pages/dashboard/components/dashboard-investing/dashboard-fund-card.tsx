import { useToLink } from "components/link/link.helper";
import TableCard from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem,
  TableCardFavoriteActionItem
} from "components/table/components/table-card/table-card-actions";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { ASSET, FUND_CURRENCY } from "constants/constants";
import { FundInvestingDetailsList } from "gv-api-web";
import { FundCardTable } from "modules/funds-table/components/funds-table/fund-card";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { VoidFuncType } from "utils/types";

const _DashboardFundCard: React.FC<Props> = ({
  updateRow,
  updateItems,
  fund
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const { t } = useTranslation();
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem
        onClick={clearAnchor}
        to={linkCreator(
          composeFundsDetailsUrl(fund.url),
          FUND_DETAILS_FOLDER_ROUTE
        )}
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
      logo={fund.logoUrl}
      color={fund.color}
      detailsUrl={linkCreator(
        composeFundsDetailsUrl(fund.url),
        FUND_DETAILS_FOLDER_ROUTE
      )}
      managerUrl={managerToPathCreator(fund.owner.url, contextTitle)}
      renderActions={renderActions}
    >
      <FundCardTable
        amount={fund.personalDetails.value}
        currency={fund.balance.currency}
        investorsCount={fund.investorsCount}
        drawdown={fund.statistic.drawdown}
        topFundAssets={fund.topFundAssets}
        totalAssetsCount={fund.totalAssetsCount}
      />
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
}
