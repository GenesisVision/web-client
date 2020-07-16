import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import TableCard, {
  IWithOffset,
  TableCardTable,
  TableCardTableColumn,
  TableCardTableRow
} from "components/table/components/table-card/table-card";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import {
  ASSET,
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "constants/constants";
import { AssetType, AssetTypeExt, DashboardTradingAsset } from "gv-api-web";
import { TAnchor } from "hooks/anchor.hook";
import { useTranslation } from "i18n";
import { DashboardPublicCardActions } from "pages/dashboard/components/dashboard-trading/dashboard-public-card-actions";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import { mapAccountToTransferItemType } from "pages/dashboard/services/dashboard.service";
import React from "react";
import NumberFormat from "react-number-format";
import {
  FOLLOW_DETAILS_FOLDER_ROUTE,
  FUND_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_FOLDER_ROUTE
} from "routes/invest.routes";
import { composeAssetDetailsUrl } from "utils/compose-url";
import { convertDateToShortFormat, distanceDate } from "utils/dates";
import { formatValueDifferentDecimalScale } from "utils/formatter";
import { VoidFuncType } from "utils/types";

const _DashboardPublicCard: React.FC<Props> = ({
  withOffset,
  showWithdraw = true,
  showInvest = true,
  showActions = true,
  asset,
  updateItems,
  ownAsset
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const detailsLink = linkCreator(
    composeAssetDetailsUrl(
      asset.assetTypeExt,
      asset.publicInfo && asset.publicInfo.url
    ),
    getAssetFolderRoute(asset.assetTypeExt)
  );

  const assetTitle = asset.publicInfo ? asset.publicInfo.title : asset.id;
  const assetColor = asset.publicInfo ? asset.publicInfo.color : "";
  const assetLogo = asset.publicInfo ? asset.publicInfo.logoUrl : "";

  const hasNasdaqAssets = false;
  // asset.assetsStructure.filter(
  //   ({ provider }) => provider === "Nasdaq"
  // ).length > 0;
  const nasdaqMessage = `${t(
    "deposit-asset.fund.nasdaq"
  )} \n ${"Monday - Friday, 1:30 p.m. - 8:00 p.m. (UTC)"}`;

  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: VoidFunction;
  }) => (
    <DashboardPublicCardActions
      currency={asset.accountInfo.currency}
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
      showTerminal={asset.actions.hasTerminal}
    />
  );
  const { programDetails, fundDetails } = asset.publicInfo;
  const topFundAssets = fundDetails && fundDetails.topFundAssets;
  const totalAssetsCount = fundDetails && fundDetails.totalAssetsCount;
  const amountTitle =
    asset.assetType === "Fund"
      ? t("header-fields.value")
      : t("header-fields.equity");
  const amountTooltip =
    asset.assetType === "Fund"
      ? t("dashboard-page:tooltips.trading.equity-fund")
      : t("dashboard-page:tooltips.investing.equity");
  return (
    <TableCard
      withOffset={withOffset}
      hasAvatar
      subTitle={t(`dashboard-page:trading.asset-types.${asset.assetTypeExt}`)}
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
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={amountTooltip}
                labelText={amountTitle}
              />
            }
          >
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.balance,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${asset.accountInfo.currency}`}
              displayType="text"
            />
          </LabeledValue>
          {asset.broker && (
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t("dashboard-page:tooltips.investing.broker")}
                  labelText={t("dashboard-page:trading.broker")}
                />
              }
            >
              {asset.broker.name}
            </LabeledValue>
          )}
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={
                  asset.assetType === "Fund"
                    ? t("dashboard-page:tooltips.trading.ddown-fund")
                    : t("dashboard-page:tooltips.investing.ddown")
                }
                labelText={t("dashboard-page:trading.ddown")}
              />
            }
          >
            <NumberFormat
              suffix="%"
              value={formatValueDifferentDecimalScale(
                asset.statistic.drawdown,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </LabeledValue>
          {!!asset.signalInfo && (
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "dashboard-page:tooltips.trading.subscribers"
                  )}
                  labelText={t("dashboard-page:trading.subscribers-count")}
                />
              }
            >
              {asset.signalInfo.subscribersCount}
            </LabeledValue>
          )}
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={
                  asset.assetType === "Fund"
                    ? t("dashboard-page:tooltips.trading.age-fund")
                    : t("dashboard-page:tooltips.investing.age-program")
                }
                labelText={t("dashboard-page:trading.age")}
              />
            }
          >
            {convertDateToShortFormat(
              distanceDate(asset.accountInfo.creationDate)
            )}
          </LabeledValue>
          {asset.accountInfo && asset.accountInfo.login && (
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t("dashboard-page:tooltips.trading.login")}
                  labelText={t("dashboard-page:trading.login")}
                />
              }
            >
              {asset.accountInfo.login}
            </LabeledValue>
          )}
        </TableCardTableColumn>
      </TableCardTable>
      {topFundAssets && (
        <TableCardTableRow>
          <FundAssetContainer
            noWrap
            assets={topFundAssets as FundAssetType[]}
            type={FUND_ASSET_TYPE.SHORT}
            size={3}
            length={totalAssetsCount}
          />
        </TableCardTableRow>
      )}
      <DepositWithdrawButtons
        infoMessage={hasNasdaqAssets ? nasdaqMessage : undefined}
        accountType={asset.assetTypeExt}
        canTransfer={asset?.actions?.canTransferMoney}
        transferableItem={mapAccountToTransferItemType(asset)}
        title={asset.publicInfo.title}
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

export const getAssetFolderRoute = (assetType: AssetTypeExt | AssetType) => {
  switch (assetType) {
    case "SignalTradingAccount":
    case "ExternalSignalTradingAccount":
    case "SignalProgram":
      return FOLLOW_DETAILS_FOLDER_ROUTE;
    case "Fund":
      return FUND_DETAILS_FOLDER_ROUTE;
    case "Program":
    default:
      return PROGRAM_DETAILS_FOLDER_ROUTE;
  }
};

interface Props extends IWithOffset {
  showWithdraw?: boolean;
  showInvest?: boolean;
  showActions?: boolean;
  ownAsset?: boolean;
  updateItems: VoidFuncType;
  asset: DashboardTradingAsset;
}

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
