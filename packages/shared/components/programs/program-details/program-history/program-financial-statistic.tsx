import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../program-details.constants";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  t,
  fetchFinancialStatistic,
  id,
  currency,
  isGMProgram
}) => {
  const columns = isGMProgram
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;
  return (
    //@todo fix all values in the table below
    <TableModule
      getItems={fetchFinancialStatistic}
      paging={DEFAULT_PAGING}
      columns={columns}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.financial-statistic.${column.name}`)}
        </span>
      )}
      renderBodyRow={event => {
        return (
          <TableRow>
            <TableCell>
              <ProgramPeriodPie
                start={new Date("2019-05-25T03:24:00")}
                end={new Date("2019-07-17T03:24:00")}
              />
            </TableCell>
            <TableCell>{event.value}</TableCell>
            <TableCell>
              <Profitability value={"1010"} prefix={PROFITABILITY_PREFIX.SIGN}>
                <NumberFormat
                  value={1010}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${event.currency}`}
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <NumberFormat value={10} displayType="text" suffix=" %" />
            </TableCell>
            <TableCell>
              <NumberFormat value={3} displayType="text" suffix=" %" />
            </TableCell>
            <TableCell>
              <Profitability
                value={formatCurrencyValue(event.value, event.currency)}
              >
                <NumberFormat
                  value={formatCurrencyValue(event.value, event.currency)}
                  thousandSeparator=" "
                  displayType="text"
                  suffix={` ${currency}`}
                />
              </Profitability>
            </TableCell>
            {isGMProgram && (
              <TableCell>
                <NumberFormat value={2} displayType="text" suffix=" %" />
              </TableCell>
            )}
          </TableRow>
        );
      }}
    />
  );
};

const ProgramFinancialStatistic = compose<React.FC<OwnProps>>(translate())(
  _ProgramFinancialStatistic
);

export default ProgramFinancialStatistic;

interface Props extends OwnProps, InjectedTranslateProps {}
interface OwnProps {
  id: string;
  currency: CURRENCIES;
  isGMProgram?: boolean;
  fetchFinancialStatistic: GetItemsFuncType;
}
