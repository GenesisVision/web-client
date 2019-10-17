import { OrderSignalModel } from "gv-api-web";
import TradesHistoryRow from "modules/copytrading-tables/components/trades-history-row";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, bindActionCreators, compose, Dispatch } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableContainer from "shared/components/table/components/table-container";
import { UpdateFilterFunc } from "shared/components/table/components/table.types";

import { clearCopytradingTable } from "../actions/copytrading-tables.actions";
import { getCopytradingTradesHistory } from "../services/copytrading-tables.service";
import { COPYTRADING_TRADES_HISTORY_COLUMNS } from "./copytrading-tables.constants";
import { dashboardTradesHistoryTableSelector } from "./copytrading-tables.selectors";

class _TradesHistoryTable extends React.PureComponent<Props> {
  render() {
    const { t, currency, title } = this.props;
    return (
      <TableContainer
        getItems={getCopytradingTradesHistory(currency)}
        dataSelector={dashboardTradesHistoryTableSelector}
        isFetchOnMount={true}
        columns={COPYTRADING_TRADES_HISTORY_COLUMNS}
        renderFilters={(
          updateFilter: UpdateFilterFunc,
          filtering: FilteringType
        ) => {
          return (
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          );
        }}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
          >
            {t(
              `investor.copytrading-tables.trades-history-header.${column.name}`
            )}
          </span>
        )}
        renderBodyRow={(trade: OrderSignalModel) => (
          <TradesHistoryRow trade={trade} title={title} />
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearCopytradingTable }, dispatch)
});

const TradesHistoryTable = compose<React.FC<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_TradesHistoryTable);

export default TradesHistoryTable;

interface OwnProps {
  title: string;
  currency?: string;
}

interface DispatchProps {
  service: {
    clearCopytradingTable(): void;
  };
}

interface Props extends OwnProps, DispatchProps, WithTranslation {}
