import clsx from "clsx";
import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "components/table/components/table-module";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TRADE_ASSET_TYPE } from "constants/constants";
import { OrderSignalModel, TradesDelay } from "gv-api-web";
import {
  generateProgramTradesColumns,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "pages/invest/programs/program-details/program-details.constants";
import DownloadButtonToolbarAuth from "pages/invest/programs/program-details/program-history-section/download-button-toolbar/download-button-toolbar-auth";
import { ProgramHistoryContext } from "pages/invest/programs/program-details/program-history-section/program-details-history-context";
import { getProgramTrades } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";

import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";
import { TradesDelayHint } from "../trades-delay-hint";
import ProgramTradesRow from "./program-trades-row";

interface Props {
  title: string;
  assetType?: TRADE_ASSET_TYPE;
  haveDelay: boolean;
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
}

const TRADES = "TRADES";

const _ProgramTrades: React.FC<Props> = ({
  title,
  assetType = TRADE_ASSET_TYPE.PROGRAM,
  haveDelay,
  showSwaps,
  showTickets,
  programId
}) => {
  const { counts, setCounts, filtering, setFiltering } = useContext(
    ProgramHistoryContext
  );
  const [tradesDelay, setTradesDelay] = useState<TradesDelay | undefined>();
  const [t] = useTranslation();

  const getItems: GetItemsFuncType = useCallback(
    (filters, requestData) => {
      return getProgramTrades(programId, filters).then(data => {
        setTradesDelay(data.tradesDelay);
        setCounts({ ...counts, trades: data.total });
        setFiltering({ ...filtering, [TRADES]: requestData });
        return data;
      });
    },
    [programId, counts, filtering]
  );

  const columns = useMemo(
    () => generateProgramTradesColumns(!showSwaps, !showTickets),
    [showSwaps, showTickets]
  );

  const delay = tradesDelay ? tradesDelay : "None";
  const renderCell = useCallback(
    (name: string) => (
      <span
        className={clsx(
          styles[`details-trades__head-cell`],
          styles[`program-details-trades__cell--${name}`]
        )}
      >
        {t(`program-details-page:history.trades.${name}`)}
      </span>
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
              programId={programId}
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
        startLabel={t("filters.date-range.program-start")}
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
    <TableModule
      loaderData={[]}
      defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
      exportButtonToolbarRender={exportButtonToolbarRender}
      getItems={getItems}
      renderFilters={renderFilters}
      paging={
        filtering[TRADES]?.paging ? filtering[TRADES]?.paging : DEFAULT_PAGING
      }
      sorting={filtering[TRADES]?.sorting}
      filtering={
        filtering[TRADES]?.filtering
          ? filtering[TRADES]?.filtering
          : PROGRAM_TRADES_FILTERS
      }
      columns={columns}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

const ProgramTrades = React.memo(_ProgramTrades);
export default ProgramTrades;
