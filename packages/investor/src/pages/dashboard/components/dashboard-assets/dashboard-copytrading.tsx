import { SignalDetails } from "gv-api-web";
import { getDashboardCopytrading } from "pages/dashboard/services/dashboard-assets.service";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import AssetStatusLabel from "shared/components/asset-status/asset-status-label";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import {
  Column,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { STATUS } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "shared/routes/programs.routes";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";

import { DASHBOARD_COPYTRADING_COLUMNS } from "./dashboard-copytrading.constants";
import { dashboardCopytradingTableSelector } from "./dashboard-copytrading.selectors";

const _DashboardCopytrading: React.FC<Props> = ({ t, title, role }) => (
  <TableContainer
    getItems={getDashboardCopytrading}
    dataSelector={dashboardCopytradingTableSelector}
    isFetchOnMount={true}
    columns={DASHBOARD_COPYTRADING_COLUMNS}
    renderFilters={(
      updateFilter: UpdateFilterFunc,
      filtering: FilteringType
    ) => (
      <>
        <SelectFilter
          name={ACTION_STATUS_FILTER_NAME}
          label={t(`${role}.dashboard-page.actions-status-filter.label`)}
          value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType}
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
        {t(`investor.dashboard-page.copytrading-header.${column.name}`)}
      </span>
    )}
    renderBodyRow={(signal: SignalDetails) => (
      <TableRow>
        <TableCell className="programs-table__cell dashboard-programs__cell--title">
          <div className="dashboard-programs__cell--avatar-title">
            <Link
              to={{
                pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
                as: composeProgramDetailsUrl(signal.url),
                state: `/ ${title}`
              }}
            >
              <AssetAvatar
                url={signal.logo}
                alt={signal.title}
                color={signal.color}
                level={signal.level}
                levelProgress={signal.levelProgress}
              />
            </Link>
            <Link
              to={{
                pathname: PROGRAM_DETAILS_FOLDER_ROUTE,
                as: composeProgramDetailsUrl(signal.url),
                state: `/ ${title}`
              }}
            >
              <GVButton variant="text" color="secondary">
                {signal.title}
              </GVButton>
            </Link>
          </div>
        </TableCell>
        <TableCell className="programs-table__cell">
          {signal.currency}
        </TableCell>
        <TableCell className="programs-table__cell">
          {signal.personalDetails.tradesCount}
        </TableCell>
        <TableCell className="programs-table__cell">
          {formatDate(signal.personalDetails.subscriptionDate)}
        </TableCell>
        <TableCell className="programs-table__cell">
          <Profitability
            value={formatCurrencyValue(
              signal.personalDetails.profit,
              signal.currency
            )}
            prefix={PROFITABILITY_PREFIX.SIGN}
          >
            <NumberFormat
              value={formatCurrencyValue(
                signal.personalDetails.profit,
                signal.currency
              )}
              thousandSeparator=" "
              displayType="text"
              allowNegative={false}
              suffix={` ${signal.currency}`}
            />
          </Profitability>
        </TableCell>
        <TableCell className="programs-table__cell dashboard-programs__cell--chart">
          {signal.chart.length && (
            <ProgramSimpleChart data={signal.chart} programId={signal.id} />
          )}
        </TableCell>
        <TableCell className="programs-table__cell">
          <AssetStatusLabel status={signal.personalDetails.status as STATUS} />
        </TableCell>
      </TableRow>
    )}
  />
);

const DashboardCopytrading = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  React.memo
)(_DashboardCopytrading);
export default DashboardCopytrading;

interface Props extends WithRoleProps, WithTranslation, OwnProps {}

interface OwnProps {
  title: string;
}
