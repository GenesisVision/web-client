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
import { TRADE_ASSET_TYPE } from "constants/constants";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../../program-details.constants";
import DownloadButtonToolbarAuth from "../download-button-toolbar/download-button-toolbar-auth";
import ProgramFinancialStatisticRow from "./program-financial-statistic-row";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  assetType = TRADE_ASSET_TYPE.PROGRAM,
  getItems,
  dataSelector,
  showCommissionRebateSometime,
  currency,
  id,
  title
}) => {
  const columns = showCommissionRebateSometime
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const [t] = useTranslation();
  const renderCell = useCallback(
    (name: string) => (
      <span
        className={clsx(
          styles["details-trades__head-cell"],
          styles[`program-details-trades__cell--${name}`]
        )}
      >
        {t(`program-details-page:history.financial-statistic.${name}`)}
      </span>
    ),
    []
  );
  const exportButtonToolbarRender = useCallback(
    (filtering: any) => (
      <DownloadButtonToolbarAuth
        method={filesService.getStatisticExportFile}
        dateRange={filtering!.dateRange}
        programId={id}
        title={title}
      />
    ),
    [id, title]
  );
  const renderFilters = useCallback(
    (updateFilter, filtering) => (
      <DateRangeFilter
        name={DATE_RANGE_FILTER_NAME}
        value={filtering[DATE_RANGE_FILTER_NAME]}
        onChange={updateFilter}
        startLabel={t(
          `filters.date-range.${
            assetType === TRADE_ASSET_TYPE.PROGRAM ? "program" : "follow"
          }-start`
        )}
      />
    ),
    []
  );
  const renderTooltip = useCallback(
    (name: string) => () => (
      <TooltipContent>
        {t(`program-details-page:history.financial-statistic.tooltips.${name}`)}
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
    period => (
      <ProgramFinancialStatisticRow
        period={period}
        showCommissionRebateSometime={showCommissionRebateSometime}
        currency={currency}
      />
    ),
    [showCommissionRebateSometime, currency]
  );

  return (
    <TableContainer
      exportButtonToolbarRender={exportButtonToolbarRender}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      renderFilters={renderFilters}
      paging={DEFAULT_PAGING}
      columns={columns}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

interface Props {
  assetType?: TRADE_ASSET_TYPE;
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const ProgramFinancialStatistic = React.memo(_ProgramFinancialStatistic);
export default ProgramFinancialStatistic;
