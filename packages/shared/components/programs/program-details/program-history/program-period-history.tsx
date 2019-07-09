import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import { TableCell, TableRow } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  PROGRAM_PERIOD_HISTORY,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";

const _ProgramPeriodHistory: React.FC<Props> = ({
  t,
  fetchPeriodHistory,
  currency,
  id
}) => {
  const fetchPeriod: GetItemsFuncType = React.useCallback(
    (filters?: FilteringType) => fetchPeriodHistory(id, filters),
    []
  );

  return (
    <TableModule
      getItems={fetchPeriod}
      defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
      filtering={PROGRAM_TRADES_FILTERS}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_PERIOD_HISTORY}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.period-history.${column.name}`)}
        </span>
      )}
      renderBodyRow={period => {
        return (
          <TableRow stripy>
            <TableCell className="details-trades__cell--period">
              <div className="details-trades__period-number">
                {period.number}
              </div>
              <ProgramPeriodPie start={period.dateFrom} end={period.dateTo} />
            </TableCell>
            <TableCell>{moment(new Date(period.dateFrom)).format()}</TableCell>
            <TableCell>{moment(new Date(period.dateTo)).format()}</TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(period.balance, currency)}
                displayType="text"
                thousandSeparator=" "
                suffix={` ${currency}`}
              />
            </TableCell>
            <TableCell>
              <Profitability
                value={period.profit}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatCurrencyValue(period.profit, currency)}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${currency}`}
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <NumberFormat value={period.investors} displayType="text" />
            </TableCell>
          </TableRow>
        );
      }}
    />
  );
};

const ProgramPeriodHistory = compose<React.FC<OwnProps>>(translate())(
  _ProgramPeriodHistory
);

export default ProgramPeriodHistory;

interface Props extends OwnProps, InjectedTranslateProps {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
  fetchPeriodHistory: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}
