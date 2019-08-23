import moment from "moment";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, humanizeDate } from "shared/utils/formatter";

import {
  PROGRAM_PERIOD_HISTORY,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";
import DownloadButtonToolbar from "./download-button-toolbar/download-button-toolbar";

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
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbar
          filtering={filtering!.dateRange}
          programId={id}
          getExportFileUrl={filesService.getPeriodExportFileUrl}
        />
      )}
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
      renderBodyRow={period => (
        <TableRow stripy>
          <TableCell className="details-trades__cell--period">
            {period.number}
          </TableCell>
          <TableCell>
            {moment(new Date(period.dateFrom)).format("YYYY-MM-DD HH:mm")}
          </TableCell>
          <TableCell>{humanizeDate(period.periodLength)}</TableCell>
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
      )}
    />
  );
};

const ProgramPeriodHistory = compose<React.FC<OwnProps>>(translate())(
  _ProgramPeriodHistory
);

export default ProgramPeriodHistory;

interface Props extends OwnProps, WithTranslation {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
  fetchPeriodHistory: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}
