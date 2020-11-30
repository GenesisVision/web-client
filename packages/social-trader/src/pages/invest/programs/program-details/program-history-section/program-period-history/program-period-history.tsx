import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TRADE_ASSET_TYPE } from "constants/constants";
import { ProgramPeriodHistoryRow } from "pages/invest/programs/program-details/program-history-section/program-period-history/program-period-history-row";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import { PROGRAM_PERIOD_HISTORY } from "../../program-details.constants";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";

const _ProgramPeriodHistory: React.FC<Props> = ({
  assetType = TRADE_ASSET_TYPE.PROGRAM,
  getItems,
  dataSelector,
  currency,
  id
}) => {
  const [t] = useTranslation();
  const renderCell = useCallback(
    (name: string) => (
      <Text>{t(`program-details-page:history.period-history.${name}`)}</Text>
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
    period => <ProgramPeriodHistoryRow period={period} currency={currency} />,
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
      columns={PROGRAM_PERIOD_HISTORY}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

interface Props {
  assetType?: TRADE_ASSET_TYPE;
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  id: string;
  currency: CurrencyEnum;
}

const ProgramPeriodHistory = React.memo(_ProgramPeriodHistory);
export default ProgramPeriodHistory;
