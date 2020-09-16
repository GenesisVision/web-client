import { DashboardPortfolioEventsLoaderData } from "components/dashboard/dashboard.loaders-data";
import { ReportsTableRow } from "components/details/details-description-section/details-investment/reports/reports-table-row";
import {
  REPORTS_TABLE_COLUMNS,
  REPORTS_TABLE_DEFAULT_FILTERS,
  REPORTS_TABLE_FILTERS
} from "components/details/details-description-section/details-investment/reports/reports.helpers";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  ComposeFiltersAllType,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { ProgramPeriodViewModel } from "gv-api-web";
import { IntervalFilter } from "pages/invest/programs/program-details/program-history-section/interval-filter";
import { fetchProgramReports } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

export interface IReportTableProps {
  id: string;
  currency: CurrencyEnum;
}

const _ReportTable: React.FC<IReportTableProps> = ({ id, currency }) => {
  const [t] = useTranslation();
  const getItems = useCallback(
    (filters?: ComposeFiltersAllType) => fetchProgramReports(id, filters),
    [id]
  );
  const renderCell = useCallback(
    ({ name }: SortingColumn) => (
      <span>{t(`program-details-page:reports.${name}`)}</span>
    ),
    []
  );
  const renderFilters = useCallback(
    (updateFilter, filtering) => (
      <>
        <IntervalFilter updateFilter={updateFilter} filtering={filtering} />
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      </>
    ),
    []
  );

  const renderBodyRow = useCallback(
    (data: ProgramPeriodViewModel) => (
      <ReportsTableRow currency={currency} data={data} />
    ),
    [currency]
  );
  return (
    <TableModule
      filtering={REPORTS_TABLE_FILTERS}
      defaultFilters={REPORTS_TABLE_DEFAULT_FILTERS}
      loaderData={[]}
      getItems={getItems}
      renderFilters={renderFilters}
      paging={DEFAULT_PAGING}
      columns={REPORTS_TABLE_COLUMNS}
      renderHeader={renderCell}
      renderBodyRow={renderBodyRow}
    />
  );
};

export default React.memo(_ReportTable);
