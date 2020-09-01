import clsx from "clsx";
import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { IntervalFilter } from "pages/invest/programs/program-details/program-history-section/interval-filter";
import { ProgramAnalyticsRow } from "pages/invest/programs/program-details/program-history-section/program-analytics/program-analytics-row";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import { PROGRAM_ANALYTICS } from "../../program-details.constants";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  id: string;
  currency: CurrencyEnum;
}

const _ProgramAnalytics: React.FC<Props> = ({
  getItems,
  dataSelector,
  currency,
  id
}) => {
  const [t] = useTranslation();
  const renderCell = useCallback(
    (name: string) => (
      <span
        className={clsx(
          styles["details-trades__head-cell"],
          styles[`program-details-trades__cell--${name}`]
        )}
      >
        {t(`program-details-page:history.period-history.${name}`)}
      </span>
    ),
    []
  );
  const exportButtonToolbarRender = useCallback(
    (filtering: any) => (
      <DownloadButtonToolbar
        filtering={filtering!.dateRange}
        programId={id}
        getExportFileUrl={filesService.getPeriodExportFileUrl}
      />
    ),
    [id]
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
  const renderTooltip = useCallback(
    (name: string) => () => (
      <TooltipContent>
        {t(`program-details-page:history.period-history.tooltips.${name}`)}
      </TooltipContent>
    ),
    []
  );
  const renderHeader = useCallback(
    column =>
      column.tooltip ? (
        <Tooltip
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          render={renderTooltip(column.name)}
        >
          {renderCell(column.name)}
        </Tooltip>
      ) : (
        renderCell(column.name)
      ),
    []
  );
  const renderBodyRow = useCallback(
    period => <ProgramAnalyticsRow period={period} currency={currency} />,
    [currency]
  );

  return (
    <TableContainer
      exportButtonToolbarRender={exportButtonToolbarRender}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      renderFilters={renderFilters}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_ANALYTICS}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

const ProgramAnalytics = React.memo(_ProgramAnalytics);
export default ProgramAnalytics;
