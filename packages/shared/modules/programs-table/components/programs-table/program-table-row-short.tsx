import classNames from "classnames";
import { ProgramDetailsOld } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import { STATUS } from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "shared/routes/programs.routes";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

interface IProgramTableRowShortProps {
  title: string;
  showRating?: boolean;
  program: ProgramDetailsOld;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
  onExpandClick(): void;
}

const ProgramTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  title,
  showRating,
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  const { t } = useTranslation();
  const {
    status,
    availableInvestmentInCurrency,
    statistic,
    logo,
    level,
    levelProgress,
    color,
    periodStarts,
    periodEnds,
    chart,
    personalDetails,
    id,
    tags
  } = program;
  const programLinkProps = {
    state: `/ ${title}`,
    pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
    as: composeProgramDetailsUrl(program.url)
  };
  const requestCurrency = program.statistic.balance.currency;
  return (
    <TableRow
      className={classNames({
        "table__row--pretender": false
      })}
      onClick={onExpandClick}
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
          value={formatCurrencyValue(statistic.balance.amount, requestCurrency)}
          suffix={` ${requestCurrency}`}
          displayType="text"
        />
      </TableCell>
      {/*<TableCell className="programs-table__cell programs-table__cell--currency">
        {currency}
      </TableCell>*/}
      <TableCell className="programs-table__cell programs-table__cell--investors">
        {statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--available-to-invest">
        {formatCurrencyValue(availableInvestmentInCurrency, requestCurrency)}{" "}
        {requestCurrency}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--period">
        {periodStarts && (
          <ProgramPeriodPie
            condition={status !== STATUS.CLOSED}
            loader={t("program-period.program-closed")}
            start={periodStarts}
            end={periodEnds}
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {moment(program.creationDate).fromNow(true)}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(statistic.drawdownPercent, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
        <Profitability
          value={formatValue(statistic.profitPercent, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profitPercent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        {chart && <ProgramSimpleChart data={chart} programId={id} />}
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
