import { Table } from "components/table/components";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import FundsTableRow from "modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/components/funds-table/funds-table.constants";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const FundsTable: React.FC<SearchTableProps<
  FundDetailsListItemItemsViewModel
>> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={FUNDS_TABLE_COLUMNS}
      items={data.items}
      renderHeader={column => <span>{t(`header-fields.${column.name}`)}</span>}
      renderBodyRow={fund => <FundsTableRow fund={fund} />}
    />
  );
};

export default React.memo(FundsTable);
