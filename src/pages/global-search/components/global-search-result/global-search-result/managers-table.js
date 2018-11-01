import ManagersTableRow from "modules/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "modules/managers-table/managers-table.constants";
import { Table } from "modules/table/components";
import withTable from "modules/table/components/with-table";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

const ManagersTable = ({ t, isPending, data, filtering, paging }) => {
  return (
    <Table
      paging={paging}
      updatePaging={() => {}}
      updateSorting={() => {}}
      columns={MANAGERS_TABLE_COLUMNS}
      items={data.managers}
      isPending={data.isPending}
      renderHeader={column => (
        <span className={`managers-table__cell--${column.name}`}>
          {t(`managers-table.${column.name}`)}
        </span>
      )}
      renderBodyRow={manager => <ManagersTableRow manager={manager} />}
    />
  );
};

export default compose(
  translate(),
  withTable({
    paging: DEFAULT_PAGING
  })
)(ManagersTable);
