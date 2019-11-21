import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ProgramDetailsList } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

interface IProgramTableRowShortProps {
  title: string;
  showRating?: boolean;
  program: ProgramDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
}

const ProgramTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  title,
  showRating,
  program,
  isAuthenticated,
  toggleFavorite
}) => {
  const { t } = useTranslation();
  const {
    logo,
    level,
    levelProgress,
    color,
    periodStarts,
    periodEnds,
    statistic,
    personalDetails,
    availableToInvest,
    id,
    tags,
    balance,
    investorsCount
  } = program;
  const programLinkProps = {
    state: `/ ${title}`,
    pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
    as: composeProgramDetailsUrl(program.url)
  };
  const { currency, amount } = balance;
  return (
    <TableRow
      className={classNames({
        "table__row--pretender": false
      })}
    >
      {showRating && <TableCell>{}</TableCell>}
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link to={programLinkProps}>
            <AssetAvatar
              url={logo}
              level={level}
              levelProgress={levelProgress}
              alt={program.title}
              color={color}
              tooltip={<LevelTooltip level={level} canLevelUp={false} />}
            />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link
                className="programs-table__cell--link"
                to={programLinkProps}
              >
                {program.title}
              </Link>
            </div>
            <div className="programs-table__cell--bottom">
              <TagProgramContainer tags={tags} />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--equity">
        <NumberFormat
          value={formatCurrencyValue(amount, currency)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--investors">
        {investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--available-to-invest">
        <NumberFormat
          value={formatCurrencyValue(availableToInvest, currency)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--period">
        {periodStarts && (
          <ProgramPeriodPie
            condition={true}
            loader={t("program-period.program-closed")}
            start={periodStarts}
            end={periodEnds}
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {distanceDate(program.creationDate)}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
        <Profitability
          value={formatValue(statistic.profit, 2)} /*statistic.profitPercent*/
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profit, 2)} /*statistic.profitPercent*/
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        {statistic && (
          <ProgramSimpleChart data={statistic.chart} programId={id} />
        )}
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className="programs-table__cell programs-table__cell--favorite">
          <FavoriteIcon
            id={id}
            selected={personalDetails.isFavorite}
            onClick={toggleFavorite}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default React.memo(ProgramTableRowShort);
