import "./program-financial-statistic.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { CurrencyEnum } from "shared/utils/types";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../../program-details.constants";
import { financialStatisticTableSelector } from "../../reducers/program-history.reducer";
import { getFinancialStatistics } from "../../services/program-details.service";
import DownloadButtonToolbarAuth from "../download-button-toolbar/download-button-toolbar-auth";
import ProgramFinancialStatisticRow from "./program-financial-statistic-row";

const _ProgramFinancialStatistic: React.FC<Props> = ({
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
      className="program-financial-statistic"
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbarAuth
          dateRange={filtering!.dateRange}
          programId={id}
          title={title}
        />
      )}
      getItems={getFinancialStatistics(id)}
      dataSelector={financialStatisticTableSelector}
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
  showCommissionRebateSometime: boolean;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const ProgramFinancialStatistic = React.memo(_ProgramFinancialStatistic);
export default ProgramFinancialStatistic;
