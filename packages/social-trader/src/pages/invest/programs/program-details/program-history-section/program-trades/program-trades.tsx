import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
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
import { OrderSignalModel } from "gv-api-web";
import { generateProgramTradesColumns } from "pages/invest/programs/program-details/program-details.constants";
import DownloadButtonToolbarAuth from "pages/invest/programs/program-details/program-history-section/download-button-toolbar/download-button-toolbar-auth";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";
import filesService from "services/file-service";

import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";
import { TradesDelayHint } from "../trades-delay-hint";
import ProgramTradesRow from "./program-trades-row";

const _ProgramTrades: React.FC<Props> = ({
  itemSelector,
  title,
  assetType = TRADE_ASSET_TYPE.PROGRAM,
  haveDelay,
  getItems,
  dataSelector,
  showSwaps,
  showTickets,
  programId
}) => {
  const [t] = useTranslation();
  const columns = useMemo(
    () => generateProgramTradesColumns(!showSwaps, !showTickets),
    [showSwaps, showTickets]
  );
  const {
    itemsData: { data }
  } = useSelector(itemSelector);
  const delay = data && data.tradesDelay ? data.tradesDelay : "None";
  const renderCell = useCallback(
    (name: string) => (
      <Text>{t(`program-details-page:history.trades.${name}`)}</Text>
    ),
    []
  );
  const exportButtonToolbarRender = useCallback(
    (filtering: any) => (
      <Row>
        {haveDelay && <TradesDelayHint delay={delay} />}
        <div>
          {assetType === TRADE_ASSET_TYPE.ACCOUNT ? (
            <DownloadButtonToolbarAuth
              method={filesService.getAccountTradesExportFileUrl}
              dateRange={filtering!.dateRange}
              id={programId}
              title={title}
            />
          ) : (
            <DownloadButtonToolbar
              filtering={filtering!.dateRange}
              programId={programId}
              getExportFileUrl={filesService.getProgramTradesExportFileUrl}
            />
          )}
        </div>
      </Row>
    ),
    [delay, programId, title]
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
        {t(`program-details-page:history.trades.tooltips.${name}`)}
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
    (trade: OrderSignalModel) => (
      <ProgramTradesRow
        trade={trade}
        showSwaps={showSwaps}
        showTickets={showTickets}
      />
    ),
    [showSwaps, showTickets]
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
  itemSelector: (state: RootState) => { [keys: string]: any };
  title: string;
  assetType?: TRADE_ASSET_TYPE;
  haveDelay: boolean;
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
}

const ProgramTrades = React.memo(_ProgramTrades);
export default ProgramTrades;
