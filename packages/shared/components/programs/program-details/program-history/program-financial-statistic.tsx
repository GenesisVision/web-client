import * as React from "react";
import { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import { TableCell, TableRow } from "shared/components/table/components";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  PROGRAM_FINANCIAL_STATISTIC_COLUMNS,
  PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
} from "../program-details.constants";

const _ProgramFinancialStatistic: React.FC<Props> = ({
  t,
  fetchFinancialStatistic,
  currency,
  id,
  isGMProgram
}) => {
  const columns = isGMProgram
    ? PROGRAM_GM_FINANCIAL_STATISTIC_COLUMNS
    : PROGRAM_FINANCIAL_STATISTIC_COLUMNS;

  const fetchStatistic: GetItemsFuncType = useCallback(
    (filters?: FilteringType) => fetchFinancialStatistic(id, filters),
    []
  );
  return (
    //@todo fix all values in the table below
    <TableModule
      getItems={fetchStatistic}
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
      renderBodyRow={period => {
        const { deposit, withdraw, commissionRebate } = period.managerStatistic;
        return (
          <TableRow>
            <TableCell>
              <ProgramPeriodPie start={period.dateFrom} end={period.dateTo} />
            </TableCell>
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
                  value={period.profit}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${currency}`}
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
              <NumberFormat value={deposit} displayType="text" />
              <NumberFormat
                value={withdraw}
                displayType="text"
                prefix={" / "}
              />
            </TableCell>
            {isGMProgram && (
              <TableCell>
                <NumberFormat
                  value={commissionRebate}
                  displayType="text"
                  suffix=" %"
                />
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
  isGMProgram?: boolean;
  currency: CURRENCIES;
  fetchFinancialStatistic: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
}
