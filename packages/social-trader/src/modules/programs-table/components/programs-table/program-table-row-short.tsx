import classNames from "classnames";
import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateRowFuncType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ProgramDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { ASSET } from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

const _ProgramTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  withDispatch,
  updateRow,
  title,
  showRating,
  program,
  isAuthenticated
}) => {
  const { linkCreator } = useToLink();
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
  const programLinkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    title,
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
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
            <AssetAvatarWithName
              url={logo}
              level={level}
              levelProgress={levelProgress}
              alt={program.title}
              color={color}
              tooltip={<LevelTooltip level={level} canLevelUp={false} />}
              name={
                <div className="programs-table__cell--title">
                  <Link
                    className="programs-table__cell--link"
                    to={programLinkProps}
                  >
                    {program.title}
                  </Link>
                  <TagProgramContainer tags={tags} />
                </div>
              }
            />
          </Link>
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
          <ToggleAssetFavoriteButton
            asset={program}
            updateRow={updateRow}
            withDispatch={withDispatch}
            assetType={ASSET.PROGRAM}
            id={id}
            isFavorite={personalDetails.isFavorite}
          >
            <FavoriteIcon id={id} selected={personalDetails.isFavorite} />
          </ToggleAssetFavoriteButton>
        </TableCell>
      )}
    </TableRow>
  );
};

interface IProgramTableRowShortProps {
  updateRow?: UpdateRowFuncType;
  withDispatch?: boolean;
  title: string;
  showRating?: boolean;
  program: ProgramDetailsListItem;
  isAuthenticated?: boolean;
}

const ProgramTableRowShort = React.memo(_ProgramTableRowShort);
export default ProgramTableRowShort;
