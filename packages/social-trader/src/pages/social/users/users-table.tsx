import { SortingColumn } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import TableModule from "components/table/components/table-module";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { UserDetailsList } from "gv-api-web";
import { UsersTableRow } from "pages/social/users/users-table-row";
import {
  USERS_DATE_RANGE_FILTER_NAME,
  USERS_DATE_RANGE_VALUES,
  USERS_TABLE_COLUMNS,
  USERS_TABLE_DEFAULT_FILTERING,
  USERS_TABLE_FILTERS
} from "pages/social/users/users.helpers";
import { getUsers } from "pages/social/users/users.service";
import React from "react";
import { useTranslation } from "react-i18next";

const UsersTableHeaderCell: React.FC<{ column: SortingColumn }> = React.memo(
  ({ column }) => {
    const [t] = useTranslation();
    return <span>{t(`users-page:table-header.${column.name}`)}</span>;
  }
);

export const UsersTable: React.FC = () => {
  return (
    <div>
      <TableModule
        name={"UsersTable"}
        cache
        loaderData={[]}
        filtering={USERS_TABLE_DEFAULT_FILTERING}
        defaultFilters={USERS_TABLE_FILTERS}
        getItems={getUsers}
        renderFilters={(updateFilter, filtering) => (
          <SelectFilter
            name={USERS_DATE_RANGE_FILTER_NAME}
            label="Date range"
            value={filtering && filtering[USERS_DATE_RANGE_FILTER_NAME]} //TODO fix filtering types
            values={USERS_DATE_RANGE_VALUES}
            onChange={updateFilter}
          />
        )}
        paging={DEFAULT_PAGING}
        columns={USERS_TABLE_COLUMNS}
        renderHeader={column => <UsersTableHeaderCell column={column} />}
        renderBodyRow={(user: UserDetailsList) => (
          <UsersTableRow key={user.userId} user={user} />
        )}
      />
    </div>
  );
};
