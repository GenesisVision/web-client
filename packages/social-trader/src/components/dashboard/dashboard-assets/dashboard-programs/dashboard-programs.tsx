import "./dashboard-programs.scss";

import classNames from "classnames";
import AssetStatus from "components/asset-status/asset-status";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import GVButton from "components/gv-button";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramPeriodEnd from "components/program-period/program-period-end/program-period-end";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableCell from "components/table/components/table-cell";
import TableContainer from "components/table/components/table-container";
import TableRow from "components/table/components/table-row";
import {
  Column,
  GetItemsFuncActionType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { ProgramDetailsFull } from "gv-api-web";
import useRole from "hooks/use-role.hook";
import { programListLoaderData } from "modules/programs-table/components/programs-table/program-table.loader-data";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { PROGRAM, ROLE, STATUS } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "./dashboard-programs.helpers";
import dashboardProgramsTableSelector from "./dashboard-programs.selector";

const _DashboardPrograms: React.FC<Props> = ({
  getDashboardPrograms,
  createButtonToolbar,
  createProgram,
  title,
  columns
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <TableContainer
      loaderData={programListLoaderData}
      createButtonToolbar={createButtonToolbar}
      emptyMessage={createProgram}
      getItems={getDashboardPrograms}
      dataSelector={dashboardProgramsTableSelector}
      isFetchOnMount={true}
      columns={columns}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <>
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(
              `${
                role ? `${role}.` : ""
              }dashboard-page.actions-status-filter.label`
            )}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      renderHeader={(column: Column) => (
        <span
          className={`programs-table__cell dashboard-programs__cell dashboard-programs__cell--${column.name}`}
        >
          {t(
            `${role ? `${role}.` : ""}dashboard-page.programs-header.${
              column.name
            }`
          )}
        </span>
      )}
      renderBodyRow={(program: ProgramDetailsFull, updateRow: any) => (
        <TableRow
          className={classNames({
            "table__row--pretender": false
          })}
        >
          <TableCell className="programs-table__cell dashboard-programs__cell--title">
            <div className="dashboard-programs__cell--avatar-title">
              <Link
                to={{
                  pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
                  as: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <AssetAvatar
                  url={program.logo}
                  level={program.level}
                  levelProgress={program.levelProgress}
                  alt={program.title}
                  color={program.color}
                  tooltip={
                    <LevelTooltip level={program.level} canLevelUp={false} />
                  }
                />
              </Link>
              <Link
                to={{
                  pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
                  as: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {program.title}
                </GVButton>
              </Link>
            </div>
          </TableCell>
          {role === ROLE.MANAGER ? (
            <TableCell className="programs-table__cell dashboard-programs__cell--login">
              {program.owner.username /*program.personalDetails.login*/}
            </TableCell>
          ) : null}
          <TableCell className="programs-table__cell dashboard-programs__cell--share">
            5{/*{formatValue(program.dashboardAssetsDetails.share, 2)}%*/}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--period">
            <ProgramPeriodEnd periodEnds={program.periodEnds} />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--value">
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.value,
                `${program.currency}`
              )}
              displayType="text"
            />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--profit">
            <Profitability
              value={formatValue(program.personalDetails.profit, 2)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatValue(program.personalDetails.profit, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--chart">
            {/*{program.chart.length && (*/}
            {/*  <ProgramSimpleChart data={program.chart} programId={program.id} />*/}
            {/*)}*/}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--status">
            <AssetStatus
              status={program.personalDetails.status as STATUS}
              id={program.id}
              asset={PROGRAM}
              onCancel={updateRow}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const DashboardPrograms = React.memo(_DashboardPrograms);
export default DashboardPrograms;

interface Props {
  title: string;
  columns: SortingColumn[];
  getDashboardPrograms: GetItemsFuncActionType;
  createButtonToolbar: JSX.Element;
  createProgram: JSX.Element;
}
