import { Table } from "components/table/components";
import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import FollowTableRowShort from "modules/follows-table/components/follow-table-row-short";
import { FOLLOW_COLUMNS } from "modules/follows-table/components/follows.constants";
import React from "react";
import { useTranslation } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const _FollowsTable: React.FC<SearchTableProps<
  FollowDetailsListItemItemsViewModel
>> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={FOLLOW_COLUMNS}
      items={data.items}
      renderHeader={column => <span>{t(`header-fields.${column.name}`)}</span>}
      renderBodyRow={follow => <FollowTableRowShort follow={follow} />}
    />
  );
};

export const FollowsTable = React.memo(_FollowsTable);
