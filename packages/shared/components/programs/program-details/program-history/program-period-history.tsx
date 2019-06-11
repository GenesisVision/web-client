import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { TableCell, TableRow } from "shared/components/table/components";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatCurrencyValue } from "shared/utils/formatter";

import { PROGRAM_PERIOD_HISTORY } from "../program-details.constants";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import moment from "moment";

const _ProgramPeriodHistory: React.FC<Props> = ({
  t,
  fetchPeriodHistory,
  id
}) => {
  return (
    //@todo fix all values in the table below
    <TableModule
      getItems={fetchPeriodHistory}
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
      renderBodyRow={event => {
        return (
          <TableRow>
            <TableCell>
              <ProgramPeriodPie
                start={new Date("2019-05-25T03:24:00")}
                end={new Date("2019-07-17T03:24:00")}
              />
            </TableCell>
            <TableCell>
              {moment(new Date("2019-05-25T03:24:00")).format()}
            </TableCell>
            <TableCell>
              {moment(new Date("2019-07-17T03:24:00")).format()}
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatCurrencyValue(event.value, event.currency)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell>
              <Profitability value={"-82"} prefix={PROFITABILITY_PREFIX.SIGN}>
                <NumberFormat
                  value={110}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${event.currency}`}
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <NumberFormat value={11} displayType="text" />
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
  fetchPeriodHistory: GetItemsFuncType;
}
