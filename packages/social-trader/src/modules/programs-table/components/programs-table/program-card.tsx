import { useToLink } from "components/link/link.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
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
import { ASSET } from "constants/constants";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import * as React from "react";
import { useCallback, useState } from "react";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { convertDateToShortFormat, distanceDate } from "utils/dates";
import { formatValue, formatValueDifferentDecimalScale } from "utils/formatter";

interface Props {
  program: ProgramDetailsListItem;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _ProgramCard: React.FC<Props> = ({ program }) => {
  const [programState, setProgramState] = useState(program);
  const { t } = useTranslation();
  const { linkCreator, contextTitle } = useToLink();
  const linkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  const requestCurrency = program.balance.currency;

  const handleUpdateRow = useCallback(program => {
    setProgramState(program);
  }, []);

  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("program-actions.details")}
      </TableCardActionsItem>
      {program.personalDetails && (
        <TableCardFavoriteActionItem
          updateRow={handleUpdateRow}
          asset={programState}
          assetType={ASSET.PROGRAM}
          id={program.id}
          isFavorite={programState.personalDetails.isFavorite}
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
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t("programs-page.tooltips.equity")}
                  labelText={t("programs-page.programs-header.equity")}
                />
              }
            >
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  program.balance.amount,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
                )}
                suffix={` ${requestCurrency}`}
                displayType="text"
              />
            </StatisticItemInner>
          </Row>
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "programs-page.tooltips.available-to-invest"
                  )}
                  labelText={t(
                    "programs-page.programs-header.available-to-invest"
                  )}
                />
              }
            >
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  program.availableToInvest,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
                )}
                displayType="text"
                suffix={` ${requestCurrency}`}
              />
            </StatisticItemInner>
          </Row>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t("programs-page.tooltips.investors")}
                  labelText={t("programs-page.programs-header.investors")}
                />
              }
            >
              <NumberFormat
                value={program.investorsCount}
                displayType="text"
                decimalScale={0}
              />
            </StatisticItemInner>
          </Row>
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t("programs-page.tooltips.period")}
                  labelText={t("programs-page.programs-header.period")}
                />
              }
            >
              <ProgramPeriodPie
                start={program.periodStarts}
                end={program.periodEnds}
              />
            </StatisticItemInner>
          </Row>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t("programs-page.tooltips.age")}
                  labelText={t("programs-page.programs-header.age")}
                />
              }
            >
              {convertDateToShortFormat(distanceDate(program.creationDate))}
            </StatisticItemInner>
          </Row>
          <Row>
            <StatisticItemInner
              label={
                <TooltipLabel
                  tooltipContent={t("programs-page.tooltips.drawdown")}
                  labelText={t("programs-page.programs-header.drawdown")}
                />
              }
            >
              <NumberFormat
                value={formatValue(program.statistic.drawdown, 2)}
                displayType="text"
                suffix="%"
              />
            </StatisticItemInner>
          </Row>
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

const ProgramCard = React.memo(_ProgramCard);
export default ProgramCard;
