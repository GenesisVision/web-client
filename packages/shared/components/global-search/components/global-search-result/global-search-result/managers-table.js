import React from "react";
import { translate } from "react-i18next";
import ManagersTableRow from "shared/components/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "shared/components/managers-table/managers-table.constants";
import { Table } from "shared/components/table/components";

const ManagersTable = ({ t, isPending, data, title }) => {
  return (
    <Table
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

export default translate()(ManagersTable);
