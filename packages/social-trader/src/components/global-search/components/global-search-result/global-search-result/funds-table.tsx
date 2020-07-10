import clsx from "clsx";
import { Table } from "components/table/components";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import FundsTableRow from "modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/components/funds-table/funds-table.constants";
import styles from "modules/funds-table/components/funds-table/funds-table.module.scss";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const FundsTable: React.FC<SearchTableProps<FundDetailsListItemItemsViewModel> &
  WithTranslation> = ({ t, data }) => {
  return (
    <Table
      columns={FUNDS_TABLE_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span
          className={clsx(
            styles["funds-table__cell"],
            styles[`funds-table__cell--${column.name}`]
          )}
        >
          {t(`header-fields.${column.name}`)}
        </span>
      )}
      renderBodyRow={fund => <FundsTableRow fund={fund} />}
    />
  );
};

export default translate()(React.memo(FundsTable));
