import { ManagersListOld } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import ManagersTableRow from "shared/components/managers-table/components/managers-table-row";
import { MANAGERS_TABLE_COLUMNS } from "shared/components/managers-table/managers-table.constants";
import { Table } from "shared/components/table/components";

import { SearchTableProps } from "./global-search-result";

const ManagersTable: React.FC<
  SearchTableProps<ManagersListOld> & WithTranslation
> = ({ t, data, title }) => {
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

export default translate()(React.memo(ManagersTable));
