import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import TableCell from "components/table/components/table-cell";
import TableModule from "components/table/components/table-module";
import TableRow from "components/table/components/table-row";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { UserDetailsList } from "gv-api-web";
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
import { managerToPathCreator } from "routes/manager.routes";
import { distanceDate, localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

const UsersTableHeaderCell: React.FC<{ column: SortingColumn }> = React.memo(
  ({ column }) => {
    const [t] = useTranslation();
    return <span>{t(`users-page:table-header.${column.name}`)}</span>;
  }
);

const UsersTableRow: React.FC<{ user: UserDetailsList }> = ({
  user: {
    url,
    logoUrl,
    username,
    regDate,
    totalProfit,
    followersCount,
    assetsUnderManagement,
    investorsCount
  }
}) => {
  const currency = "USD";
  const { contextTitle } = useToLink();
  return (
    <TableRow>
      <TableCell>
        <Link to={managerToPathCreator(url, contextTitle)}>
          <AvatarWithName
            avatar={<ProfileAvatar url={logoUrl} alt={username} />}
            name={username}
          />
        </Link>
      </TableCell>
      <TableCell>{distanceDate(regDate)}</TableCell>
      <TableCell>
        {formatCurrencyValue(assetsUnderManagement, currency)} {currency}
      </TableCell>
      <TableCell>{investorsCount}</TableCell>
      <TableCell>{followersCount}</TableCell>
      <TableCell>{totalProfit} %</TableCell>
    </TableRow>
  );
};

export const UsersTable: React.FC = () => {
  return (
    <div>
      <TableModule
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
        renderBodyRow={(user: UserDetailsList) => <UsersTableRow user={user} />}
      />
    </div>
  );
};
