import { Table } from "components/table/components";
import { ItemsViewModelFundDetailsListItem } from "gv-api-web";
import FundsTableRow from "modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/components/funds-table/funds-table.constants";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const FundsTable: React.FC<SearchTableProps<ItemsViewModelFundDetailsListItem> &
  WithTranslation> = ({ t, data }) => {
  return (
    <Table
      columns={FUNDS_TABLE_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span className={`funds-table__cell funds-table__cell--${column.name}`}>
          {t(`funds-page.funds-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={fund => <FundsTableRow fund={fund} />}
    />
  );
};

export default translate()(React.memo(FundsTable));
