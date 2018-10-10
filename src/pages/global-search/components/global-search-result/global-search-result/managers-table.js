import ManagersTableRow from "modules/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "modules/managers-table/managers-table.constants";
import TableModule from "modules/table/components/table-module";
import React from "react";
import { translate } from "react-i18next";

const ManagersTable = ({ t, isPending, data }) => {
  const { managers: items, total } = data;
  return (
    <TableModule
      fetchOnMount={false}
      data={{ items, total }}
      paging={{ totalPages: 1 }}
      columns={MANAGERS_TABLE_COLUMNS}
      renderHeader={column => (
        <span className={`managers-table__cell--${column.name}`}>
          {t(`managers-table.${column.name}`)}
        </span>
      )}
      renderBodyRow={manager => <ManagersTableRow manager={manager} />}
    />
  );
};

export default translate()(ManagersTable);
