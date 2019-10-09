import { ManagersList } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import ManagersTableRow from "shared/components/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "shared/components/managers-table/managers-table.constants";
import { Table } from "shared/components/table/components";

import { SearchTableProps } from "./global-search-result";

const _ManagersTable: React.FC<SearchTableProps<ManagersList>> = ({
  data,
  title
}) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={MANAGERS_TABLE_COLUMNS}
      items={data.managers}
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

const ManagersTable = React.memo(_ManagersTable);
export default ManagersTable;
