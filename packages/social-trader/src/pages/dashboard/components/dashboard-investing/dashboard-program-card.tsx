import AssetStatus from "components/asset-status/asset-status";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { UpdateRowFuncType } from "components/table/components/table.types";
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
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET, STATUS } from "constants/constants";
import { ProgramInvestingDetailsList } from "gv-api-web";
import { useTranslation } from "i18n";
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import ProgramFeesBlock from "pages/invest/programs/program-details/program-popup/program-fees-block";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue } from "utils/formatter";
import { VoidFuncType } from "utils/types";

const _DashboardProgramCard: React.FC<Props> = ({
  updateRow,
  updateItems,
  program
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const { t } = useTranslation();
  const linkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  const requestCurrency = program.balance.currency;

  const renderAssetDetailsExtraBlock = useCallback(
    () => <DetailsTags tags={program.tags} />,
    [program.tags]
  );

  const renderAssetFeesBlock = useCallback(
    () => (
      <ProgramFeesBlock
        currency={program.currency}
        successFee={program.successFeeCurrent}
        stopOut={program.stopOutLevelCurrent}
        managementFee={program.managementFeeCurrent}
      />
    ),
    [program]
  );

  const renderProgramPopup = (popupTop: JSX.Element, form: JSX.Element) => {
    return (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={program.owner.url}
        totalAvailableInvestment={program.totalAvailableInvestment}
        assetColor={program.color}
        assetLevelProgress={program.levelProgress}
        assetLevel={program.level}
        assetLogo={program.logoUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        AssetFeesBlock={renderAssetFeesBlock}
        brokerName={program.brokerDetails.name}
        brokerLogo={program.brokerDetails.logoUrl}
        currency={program.currency}
        title={program.title}
        assetOwner={program.owner.username}
        form={form}
      />
    );
  };

  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("asset-actions.details")}
      </TableCardActionsItem>
      {program.personalDetails && (
        <TableCardFavoriteActionItem
          updateRow={updateRow}
          asset={program}
          assetType={ASSET.PROGRAM}
          id={program.id}
          isFavorite={program.personalDetails.isFavorite}
        />
      )}
    </TableCardActions>
  );
  return (
    <TableCard
      level={program.level}
      levelProgress={program.levelProgress}
      assetId={program.id}
      profit={program.statistic.profit}
      chart={program.statistic.chart}
      color={program.color}
      hasAvatar
      title={program.title}
      subTitle={program.owner.username}
      logo={program.logoUrl}
      managerUrl={managerToPathCreator(program.owner.url, contextTitle)}
      detailsUrl={linkProps}
      renderActions={renderActions}
      extraBlock={program.tags && <TagProgramContainer tags={program.tags} />}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.investing.profit")}
                labelText={t("header-fields.profit")}
              />
            }
          >
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.profit,
                requestCurrency
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.investing.value")}
                labelText={t("header-fields.value")}
              />
            }
          >
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.value,
                requestCurrency
              )}
              suffix={` ${requestCurrency}`}
              displayType="text"
            />
          </LabeledValue>
        </TableCardTableColumn>
        {program.type === "FixedPeriod" && (
          <TableCardTableColumn>
            <LabeledValue label={t("header-fields.period")}>
              <ProgramPeriodPie
                start={program.periodStarts}
                end={program.periodEnds}
              />
            </LabeledValue>
          </TableCardTableColumn>
        )}
      </TableCardTable>
      <TableCardTable>
        <TableCardTableColumn>
          <AssetStatus
            status={program.personalDetails.status as STATUS}
            id={program.id}
            onCancel={updateItems}
          />
        </TableCardTableColumn>
        {program.type === "FixedPeriod" &&
          program.personalDetails.canChangeReinvest && (
            <TableCardTableColumn>
              <ProgramReinvestingContainer
                id={program.id}
                isReinvesting={program.personalDetails.isReinvest}
              />
            </TableCardTableColumn>
          )}
      </TableCardTable>
      <DepositWithdrawButtons
        renderAssetPopup={renderProgramPopup}
        GM={program?.type === "DailyPeriod"}
        isProcessingRealTime={program.dailyPeriodDetails?.isProcessingRealTime}
        entryFee={program.managementFeeCurrent}
        availableToInvest={program.availableToInvest}
        title={program.title}
        onApply={updateItems}
        canWithdraw={program.personalDetails.canWithdraw}
        canInvest={program.personalDetails.canInvest}
        broker={program.brokerDetails.type}
        type={ASSET.PROGRAM}
        id={program.id}
        currency={program.currency}
      />
    </TableCard>
  );
};

interface Props {
  updateRow?: UpdateRowFuncType;
  updateItems: VoidFuncType;
  program: ProgramInvestingDetailsList;
}

const DashboardProgramCard = React.memo(_DashboardProgramCard);
export default DashboardProgramCard;
