import AssetStatus from "components/asset-status/asset-status";
import { useToLink } from "components/link/link.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import StatisticItem from "components/statistic-item/statistic-item";
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
import { UpdateRowFuncType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET, STATUS } from "constants/constants";
import { ProgramInvestingDetailsList } from "gv-api-web";
import { useTranslation } from "i18n";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import * as React from "react";
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

  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("program-actions.details")}
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
          <StatisticItem label={t("programs-page.programs-header.profit")}>
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.profit,
                requestCurrency
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.value")}>
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.value,
                requestCurrency
              )}
              suffix={` ${requestCurrency}`}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.period")}>
            <ProgramPeriodPie
              start={program.periodStarts}
              end={program.periodEnds}
            />
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
      <TableCardTable>
        <TableCardTableColumn>
          <AssetStatus
            status={program.personalDetails.status as STATUS}
            id={program.id}
            onCancel={updateItems}
          />
        </TableCardTableColumn>
        {program.personalDetails.canChangeReinvest && (
          <TableCardTableColumn>
            <ProgramReinvestingContainer
              id={program.id}
              isReinvesting={program.personalDetails.isReinvest}
            />
          </TableCardTableColumn>
        )}
      </TableCardTable>
      <DepositWithdrawButtons
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
