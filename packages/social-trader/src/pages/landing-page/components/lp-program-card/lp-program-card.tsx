import { useToLink } from "components/link/link.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import LPTableCard, {
  LPTableCardTable,
  LPTableCardTableColumn
} from "pages/landing-page/components/lp-table-card/lp-table-card";
import * as React from "react";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { convertDateToShortFormat, distanceDate } from "utils/dates";
import { formatValue, formatValueDifferentDecimalScale } from "utils/formatter";

interface Props {
  program: ProgramDetailsListItem;
  className?: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _LPProgramCard: React.FC<Props> = ({ program, className }) => {
  const { t } = useTranslation();
  const { linkCreator, contextTitle } = useToLink();
  const linkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  const requestCurrency = program.balance.currency;
  return (
    <LPTableCard
      level={program.level}
      levelProgress={program.levelProgress}
      assetId={program.id}
      profit={program.statistic.profit}
      chart={program.statistic.chart}
      color={program.color}
      title={program.title}
      subTitle={program.owner.username}
      logo={program.logoUrl}
      managerUrl={managerToPathCreator(program.owner.url, contextTitle)}
      detailsUrl={linkProps}
      extraBlock={program.tags && <TagProgramContainer tags={program.tags} />}
      className={className}
    >
      <LPTableCardTable>
        <LPTableCardTableColumn>
          <StatisticItemInner label={t("programs-page.programs-header.equity")}>
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
          <StatisticItemInner
            label={t("programs-page.programs-header.available-to-invest")}
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
        </LPTableCardTableColumn>
        <LPTableCardTableColumn>
          <StatisticItemInner
            label={t("programs-page.programs-header.investors")}
          >
            <NumberFormat
              value={program.investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItemInner>
          <StatisticItemInner label={t("programs-page.programs-header.period")}>
            <ProgramPeriodPie
              start={program.periodStarts}
              end={program.periodEnds}
            />
          </StatisticItemInner>
        </LPTableCardTableColumn>
        <LPTableCardTableColumn>
          <StatisticItemInner label={t("programs-page.programs-header.age")}>
            {convertDateToShortFormat(distanceDate(program.creationDate))}
          </StatisticItemInner>
          <StatisticItemInner
            label={t("programs-page.programs-header.drawdown")}
          >
            <NumberFormat
              value={formatValue(program.statistic.drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItemInner>
        </LPTableCardTableColumn>
      </LPTableCardTable>
    </LPTableCard>
  );
};

const LpProgramCard = React.memo(_LPProgramCard);
export default LpProgramCard;
