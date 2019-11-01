import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { generateProgramTradesColumns } from "shared/components/programs/program-details/program-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import filesService from "shared/services/file-service";

import { tradesSelector } from "../../reducers/program-history.reducer";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";
import { TradesDelayHint } from "../trades-delay-hint";
import ProgramTradesRow from "./program-trades-row";

const _ProgramTrades: React.FC<Props> = ({
  getItems,
  dataSelector,
  showSwaps,
  showTickets,
  programId
}) => {
  const [t] = useTranslation();
  const columns = generateProgramTradesColumns(!showSwaps, !showTickets);
  const {
    itemsData: { data }
  } = useSelector(tradesSelector);
  const delay = data ? data.tradesDelay : "None";

  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <div className="details-trades__toolbar">
          <TradesDelayHint delay={delay} />
          <div>
            <DownloadButtonToolbar
              filtering={filtering!.dateRange}
              programId={programId}
              getExportFileUrl={filesService.getTradesExportFileUrl}
            />
          </div>
        </div>
      )}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      columns={columns}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`program-details-page.history.trades.${column.name}`)}
        </span>
      )}
      renderBodyRow={(trade: OrderModel) => (
        <ProgramTradesRow
          trade={trade}
          showSwaps={showSwaps}
          showTickets={showTickets}
        />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
}

const ProgramTrades = React.memo(_ProgramTrades);
export default ProgramTrades;
