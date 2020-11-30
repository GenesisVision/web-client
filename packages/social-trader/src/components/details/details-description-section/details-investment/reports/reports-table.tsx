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
import { DEFAULT_EVENTS_PAGING } from "components/table/reducers/table-paging.reducer";
import { ProgramPeriodViewModel } from "gv-api-web";
import DownloadButtonToolbarAuth from "pages/invest/programs/program-details/program-history-section/download-button-toolbar/download-button-toolbar-auth";
import {
  INTERVAL_FILTER_NAME,
  IntervalFilter
} from "pages/invest/programs/program-details/program-history-section/interval-filter";
import { fetchProgramReports } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

export interface IReportTableProps {
  title: string;
  id: string;
  currency: CurrencyEnum;
}

const _ReportTable: React.FC<IReportTableProps> = ({ title, id, currency }) => {
  const [t] = useTranslation();
  const getItems = useCallback(
    (filters?: ComposeFiltersAllType) => fetchProgramReports(id, filters),
    [id]
  );

  const exportButtonToolbarRender = useCallback(
    (filtering: any) => (
      <DownloadButtonToolbarAuth
        method={filesService.getReportsExportFileUrl}
        timeframe={filtering![INTERVAL_FILTER_NAME]}
        dateRange={filtering![DATE_RANGE_FILTER_NAME]}
        id={id}
        title={title}
      />
    ),
    [id, title]
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
      name={"ReportTable"}
      cache
      exportButtonToolbarRender={exportButtonToolbarRender}
      filtering={REPORTS_TABLE_FILTERS}
      defaultFilters={REPORTS_TABLE_DEFAULT_FILTERS}
      loaderData={[]}
      getItems={getItems}
      renderFilters={renderFilters}
      paging={DEFAULT_EVENTS_PAGING}
      columns={REPORTS_TABLE_COLUMNS}
      renderHeader={renderCell}
      renderBodyRow={renderBodyRow}
    />
  );
};

export default React.memo(_ReportTable);
