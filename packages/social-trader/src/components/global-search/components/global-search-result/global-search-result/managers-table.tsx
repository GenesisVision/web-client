import ManagersTableRow from "components/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "components/managers-table/managers-table.constants";
import { Table } from "components/table/components";
import React from "react";
import { useTranslation } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

type ManagersList = any;
const ManagersTable: React.FC<SearchTableProps<ManagersList>> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={MANAGERS_TABLE_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span className={`managers-table__cell--${column.name}`}>
          {t(`managers-table.${column.name}`)}
        </span>
      )}
      renderBodyRow={manager => <ManagersTableRow manager={manager} />}
    />
  );
};

export default React.memo(ManagersTable);
