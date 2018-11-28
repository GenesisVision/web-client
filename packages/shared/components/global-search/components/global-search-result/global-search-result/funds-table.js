import React from "react";
import { translate } from "react-i18next";
import FundsTableRow from "shared/modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/modules/funds-table/components/funds-table/funds-table.constants";
import { Table } from "shared/components/table/components";

const FundsTable = ({ t, title, isPending, data }) => {
  return (
    <Table
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      isPending={data.isPending}
      renderHeader={column => (
        <span className={`funds-table__cell funds-table__cell--${column.name}`}>
          {t(`funds-page.funds-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={fund => <FundsTableRow title={title} fund={fund} />}
    />
  );
};

export default translate()(FundsTable);
