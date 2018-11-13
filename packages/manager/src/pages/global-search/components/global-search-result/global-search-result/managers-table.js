import ManagersTableRow from "shared/components/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "shared/components/managers-table/managers-table.constants";
import { Table } from "shared/components/table/components";
import withTable from "shared/components/table/components/with-table";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

const ManagersTable = ({ t, isPending, data, filtering, paging, title }) => {
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
      renderBodyRow={manager => (
        <ManagersTableRow manager={manager} title={title} />
      )}
    />
  );
};

export default compose(
  translate(),
  withTable({
    paging: DEFAULT_PAGING
  })
)(ManagersTable);
