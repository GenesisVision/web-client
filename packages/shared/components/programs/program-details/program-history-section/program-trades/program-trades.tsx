import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { generateProgramTradesColumns } from "shared/components/programs/program-details/program-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import filesService from "shared/services/file-service";

import { tradesTableSelector } from "../../reducers/program-history.reducer";
import { getTrades } from "../../services/program-details.service";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";
import ProgramTradesRow from "./program-trades-row";

const _ProgramTrades: React.FC<Props> = ({
  showSwaps,
  showTickets,
  programId
}) => {
  const [t] = useTranslation();
  const columns = generateProgramTradesColumns(!showSwaps, !showTickets);

  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbar
          filtering={filtering!.dateRange}
          programId={programId}
          getExportFileUrl={filesService.getTradesExportFileUrl}
        />
      )}
      getItems={getTrades(programId)}
      dataSelector={tradesTableSelector}
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
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
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
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
}

const ProgramTrades = React.memo(_ProgramTrades);
export default ProgramTrades;
