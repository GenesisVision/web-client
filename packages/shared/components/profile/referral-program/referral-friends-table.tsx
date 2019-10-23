import * as faker from "faker";
import { ReferralFriend } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { referralFriendsTableSelector } from "shared/reducers/profile-reducer";
import { formatDate } from "shared/utils/dates";
import { tableLoaderCreator } from "shared/utils/helpers";

import { getFriendsTable } from "./services/referral-program-services";

const _ReferralFriendsTable: React.FC = () => {
  const [t] = useTranslation();
  return (
    <TableContainer
      loaderData={ReferralFriendsLoaderData}
      title={t("profile-page.referral-program.referral-friends.title")}
      getItems={getFriendsTable}
      dataSelector={referralFriendsTableSelector}
      isFetchOnMount={true}
      columns={COLUMNS}
      renderHeader={column =>
        t(
          `profile-page.referral-program.referral-friends.header.${column.name}`
        )
      }
      renderBodyRow={(friend: ReferralFriend) => (
        <TableRow stripy>
          <TableCell>{friend.emailMask}</TableCell>
          <TableCell>{formatDate(friend.registerDate)}</TableCell>
        </TableRow>
      )}
    />
  );
};

const COLUMNS = [
  {
    name: "email"
  },
  {
    name: "date"
  }
];

const getReferralFriendLoaderData = (): ReferralFriend => ({
  registerDate: (new Date().toString() as unknown) as Date,
  emailMask: faker.internet.email()
});

const ReferralFriendsLoaderData = tableLoaderCreator(
  getReferralFriendLoaderData
);

export const ReferralFriendsTable = React.memo(_ReferralFriendsTable);
