import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import moment from "moment";
import * as React from "react";
import {
  useTranslation,
  WithTranslation,
  withTranslation as translate
} from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "shared/components/programs/program-details/program-details.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE, IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatValue } from "shared/utils/formatter";

const PAGING = {
  currentPage: 1,
  itemsOnPage: 2000,
  totalPages: 0
};

const _ProgramOpenPositions: React.FC<Props> = ({ currency, programId }) => {
  // const getOpenPositions: GetItemsFuncType = (filters?: FilteringType) =>
  //   fetchOpenPositions(programId, filters);
  const [t] = useTranslation();
  return (
    <TableModule
      loader={false}
      getItems={"" as any}
      paging={PAGING}
      columns={PROGRAM_OPEN_POSITIONS_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.open-positions.${column.name}`)}
        </span>
      )}
      renderBodyRow={position => {
        return (
          <TableRow stripy>
            <TableCell className="details-trades__cell program-details-trades__cell--date">
              {moment(position.date).format()}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--symbol">
              {position.symbol}
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--direction">
              <BaseProfitability
                isPositive={position.direction === "Buy"}
                isNegative={position.direction === "Sell"}
              >
                {position.direction}
              </BaseProfitability>
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--volume">
              <NumberFormat
                value={formatValue(position.volume, DEFAULT_DECIMAL_SCALE / 2)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={formatValue(position.price, DEFAULT_DECIMAL_SCALE)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--priceCurrent">
              <NumberFormat
                value={formatValue(
                  position.priceCurrent,
                  DEFAULT_DECIMAL_SCALE
                )}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="details-trades__cell program-details-trades__cell--profit">
              <Profitability
                value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix={` ${currency}`}
                />
              </Profitability>
            </TableCell>
          </TableRow>
        );
      }}
    />
  );
};

interface Props {
  currency: CURRENCIES;
  programId: string;
}

const ProgramOpenPositions = React.memo(_ProgramOpenPositions);
export default ProgramOpenPositions;
