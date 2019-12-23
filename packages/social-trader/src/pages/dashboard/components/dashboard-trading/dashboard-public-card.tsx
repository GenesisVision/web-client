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
import { DashboardTradingAsset } from "gv-api-web";
import { TAnchor } from "hooks/anchor.hook";
import { DashboardPublicCardActions } from "pages/dashboard/components/dashboard-trading/dashboard-public-card-actions";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import { mapAccountToTransferItemType } from "pages/dashboard/services/dashboard.service";
import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import {
  ASSET,
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeAssetDetailsUrl } from "utils/compose-url";
import { formatValueDifferentDecimalScale } from "utils/formatter";
import { VoidFuncType } from "utils/types";

import { TitleContext } from "../../dashboard.constants";

const _DashboardPublicCard: React.FC<Props> = ({
  showWithdraw = true,
  showInvest = true,
  showActions = true,
  asset,
  updateItems,
  ownAsset
}) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const detailsLink = {
    pathname: composeAssetDetailsUrl(
      asset.assetTypeExt,
      asset.publicInfo && asset.publicInfo.url
    ),
    state: `/ ${title}`
  };

  const assetTitle = asset.publicInfo ? asset.publicInfo.title : asset.id;
  const assetColor = asset.publicInfo ? asset.publicInfo.color : "";
  const assetLogo = asset.publicInfo ? asset.publicInfo.logo : "";
  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: VoidFunction;
  }) => (
    <DashboardPublicCardActions
      brokerType={asset.broker && asset.broker.type}
      onApply={updateItems}
      name={asset.publicInfo.title}
      actions={asset.actions}
      assetType={asset.assetType}
      anchor={anchor}
      clearAnchor={clearAnchor}
      id={asset.id}
      url={asset.publicInfo && asset.publicInfo.url}
      showClosePeriod={asset.assetType === ASSET.PROGRAM}
      showTerminal={asset.assetType !== ASSET.FUND}
    />
  );
  const { programDetails, fundDetails } = asset.publicInfo;
  const topFundAssets = fundDetails && fundDetails.topFundAssets;
  const totalAssetsCount = fundDetails && fundDetails.totalAssetsCount;
  return (
    <TableCard
      hasAvatar
      subTitle={asset.assetTypeExt}
      level={programDetails ? programDetails.level : undefined}
      levelProgress={programDetails ? programDetails.levelProgress : undefined}
      title={assetTitle}
      color={assetColor}
      logo={assetLogo}
      detailsUrl={detailsLink}
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      renderActions={showActions ? renderActions : undefined}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.equity")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.balance,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${asset.accountInfo.currency}`}
              displayType="text"
            />
          </StatisticItem>
          {asset.broker && (
            <StatisticItem label={t("dashboard-page.trading.broker")}>
              {asset.broker.name}
            </StatisticItem>
          )}
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.ddown")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.statistic.drawdown,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </StatisticItem>
          {!!asset.signalInfo && (
            <StatisticItem
              label={t("dashboard-page.trading.subscribers-count")}
            >
              {asset.signalInfo.subscribersCount}
            </StatisticItem>
          )}
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.age")}>
            {distanceDate(asset.accountInfo.creationDate)}
          </StatisticItem>
          {asset.accountInfo && asset.accountInfo.login && (
            <StatisticItem label={t("dashboard-page.trading.login")}>
              {asset.accountInfo.login}
            </StatisticItem>
          )}
        </TableCardTableColumn>
      </TableCardTable>
      {topFundAssets && (
        <TableCardTableRow>
          <FundAssetContainer
            assets={topFundAssets as FundAssetType[]}
            type={FUND_ASSET_TYPE.SHORT}
            size={3}
            length={totalAssetsCount}
          />
        </TableCardTableRow>
      )}
      <DepositWithdrawButtons
        accountType={asset.assetTypeExt}
        canTransfer={asset.actions.canTransferMoney}
        transferableItem={mapAccountToTransferItemType(asset)}
        title={asset.accountInfo.title}
        onApply={updateItems}
        ownAsset={ownAsset}
        canWithdraw={asset.actions.canAddRequestWithdraw && showWithdraw}
        canInvest={asset.actions.canAddRequestInvest && showInvest}
        broker={asset.broker && asset.broker.type}
        type={asset.assetType as ASSET}
        id={asset.id}
        currency={asset.accountInfo.currency}
      />
    </TableCard>
  );
};

interface Props {
  showWithdraw?: boolean;
  showInvest?: boolean;
  showActions?: boolean;
  ownAsset?: boolean;
  updateItems: VoidFuncType;
  asset: DashboardTradingAsset;
}

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
