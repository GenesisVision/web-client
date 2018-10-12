import { Table } from "modules/table/components";
import withTable from "modules/table/components/with-table";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/funds-table.constants";
import FundsTableRow from "../../../../../modules/funds-table/components/funds-table/fund-table-row";

const FundsTable = ({
  t,
  isPending,
  data,
  filtering,
  paging,
  updatePaging
}) => {
  return (
    <Table
      paging={paging}
      updatePaging={updatePaging}
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      isPending={data.isPending}
      renderHeader={column => (
        <span className={`funds-table__cell--${column.name}`}>
          {t(`funds-page.funds-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={fund => <FundsTableRow fund={fund} />}
    />
  );
};

export default compose(
  translate(),
  withTable({
    paging: DEFAULT_PAGING
  })
)(FundsTable);
