import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
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
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import { DashboardPublicCardActions } from "pages/dashboard/components/dashboard-trading/dashboard-public-card-actions";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import { mapAccountToTransferItemType } from "pages/dashboard/services/dashboard.service";
import FundAssetsBlock from "pages/invest/funds/fund-details/fund-popup/fund-assets-block";
import FundFeesBlock from "pages/invest/funds/fund-details/fund-popup/fund-fees-block";
import { generateScheduleText } from "pages/invest/funds/fund-details/services/fund-details.service";
import ProgramFeesBlock from "pages/invest/programs/program-details/program-popup/program-fees-block";
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

export const getAssetFolderRoute = (assetType: AssetTypeExt | AssetType) => {
  switch (assetType) {
    case "SignalTradingAccount":
    case "ExternalSignalTradingAccount":
    case "SignalProgram":
      return FOLLOW_DETAILS_FOLDER_ROUTE;
    case "SelfManagedFund":
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

  const hasTradingSchedule =
    asset.publicInfo?.fundDetails?.tradingSchedule?.hasTradingSchedule;
  const schedule = generateScheduleText(
    asset.publicInfo?.fundDetails?.tradingSchedule
  );
  const investMessage = `${t("trading-schedule.invest-fund")} \n ${schedule}`;

  const renderAssetPopup =
    asset.assetType === ASSET.PROGRAM
      ? (popupTop: JSX.Element, form: JSX.Element) => {
        return (
          <InvestDefaultPopup
            popupTop={popupTop}
            ownerUrl={asset.publicInfo.owner.url}
            totalAvailableInvestment={
              asset.publicInfo.programDetails.totalAvailableInvestment
            }
            assetColor={asset.publicInfo.color}
            assetLevelProgress={asset.publicInfo.programDetails.levelProgress}
            assetLevel={asset.publicInfo.programDetails.level}
            assetLogo={asset.publicInfo.logoUrl}
            AssetDetailsExtraBlock={() => <DetailsTags tags={asset.tags} />}
            AssetFeesBlock={() => (
              <ProgramFeesBlock
                currency={asset.accountInfo.originalCurrency}
                successFee={asset.publicInfo.programDetails.successFeeCurrent}
                stopOut={asset.publicInfo.programDetails.stopOutLevelCurrent}
                managementFee={
                  asset.publicInfo.programDetails.managementFeeCurrent
                }
              />
            )}
            brokerName={asset.broker.name}
            brokerLogo={asset.broker.logoUrl}
            currency={asset.accountInfo.originalCurrency}
            title={asset.publicInfo.title}
            assetOwner={asset.publicInfo.owner.username}
            form={form}
          />
        );
      }
      : (popupTop: JSX.Element, form: JSX.Element) => {
        return (
          <InvestDefaultPopup
            popupTop={popupTop}
            ownerUrl={asset.publicInfo.owner.url}
            assetColor={asset.publicInfo.color}
            assetLogo={asset.publicInfo.logoUrl}
            AssetDetailsExtraBlock={() => (
              <FundAssetsBlock
                assets={asset.publicInfo.fundDetails.topFundAssets}
              />
            )}
            AssetFeesBlock={() => (
              <FundFeesBlock
                entryFee={asset.publicInfo.fundDetails.entryFeeCurrent}
                exitFee={asset.publicInfo.fundDetails.exitFeeCurrent}
              />
            )}
            title={asset.publicInfo.title}
            assetOwner={asset.publicInfo.owner.username}
            form={form}
          />
        );
      };

  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: VoidFunction;
  }) => (
    <DashboardPublicCardActions
      asset={asset}
      anchor={anchor}
      clearAnchor={clearAnchor}
      onApply={updateItems}
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

  const fee =
    asset.assetType === "Fund"
      ? asset.publicInfo.fundDetails?.entryFeeCurrent
      : asset.publicInfo.programDetails?.managementFeeCurrent;
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
            type={"short"}
            size={3}
            length={totalAssetsCount}
          />
        </TableCardTableRow>
      )}
      <DepositWithdrawButtons
        renderAssetPopup={renderAssetPopup}
        GM={asset.publicInfo?.programDetails?.type === "DailyPeriod"}
        isProcessingRealTime={
          asset.publicInfo?.programDetails?.dailyPeriodDetails
            ?.isProcessingRealTime
        }
        entryFee={fee}
        infoMessage={hasTradingSchedule ? investMessage : undefined}
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

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
