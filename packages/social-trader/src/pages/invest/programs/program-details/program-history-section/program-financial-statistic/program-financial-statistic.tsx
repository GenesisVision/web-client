import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import React from "react";
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
  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          method={filesService.getStatisticExportFile}
          dateRange={filtering!.dateRange}
          programId={id}
          title={title}
        />
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
          {t(`program-details-page.history.financial-statistic.${column.name}`)}
        </span>
      )}
      renderBodyRow={period => (
        <ProgramFinancialStatisticRow
          period={period}
          showCommissionRebateSometime={showCommissionRebateSometime}
          currency={currency}
        />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const ProgramFinancialStatistic = React.memo(_ProgramFinancialStatistic);
export default ProgramFinancialStatistic;
