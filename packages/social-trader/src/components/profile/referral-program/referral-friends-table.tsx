import TableCell from "components/table/components/table-cell";
import TableContainer from "components/table/components/table-container";
import TableRow from "components/table/components/table-row";
import { ReferralFriend } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { referralFriendsTableSelector } from "reducers/profile-reducer";
import { formatDate } from "utils/dates";
import { getRandomEmail, tableLoaderCreator } from "utils/helpers";

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
          <TableCell>{formatDate(friend.date)}</TableCell>
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
  date: (new Date().toString() as unknown) as Date,
  emailMask: getRandomEmail()
});

const ReferralFriendsLoaderData = tableLoaderCreator(
  getReferralFriendLoaderData
);

export const ReferralFriendsTable = React.memo(_ReferralFriendsTable);
