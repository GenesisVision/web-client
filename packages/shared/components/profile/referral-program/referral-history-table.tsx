import { RewardDetails } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "shared/components/download-button/download-button";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { referralHistoryTableSelector } from "shared/reducers/profile-reducer";
import { formatDate } from "shared/utils/dates";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";

import { getHistoryTable } from "./services/referral-program-services";

const _ReferralHistoryTable: React.FC = () => {
  const [t] = useTranslation();
  return (
    <TableContainer
      loaderData={ReferralFriendsLoaderData}
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButton getExportFileUrl={() => ""} />
      )}
      title={t("profile-page.referral-program.referral-history.title")}
      getItems={getHistoryTable}
      dataSelector={referralHistoryTableSelector}
      isFetchOnMount={true}
      columns={COLUMNS}
      renderHeader={column =>
        t(
          `profile-page.referral-program.referral-history.header.${column.name}`
        )
      }
      renderBodyRow={(reward: RewardDetails) => (
        <TableRow stripy>
          <TableCell>
            {reward.amount} {reward.currency}
          </TableCell>
          <TableCell>{formatDate(reward.date)}</TableCell>
        </TableRow>
      )}
    />
  );
};

const COLUMNS = [
  {
    name: "value"
  },
  {
    name: "date"
  }
];

const getReferralFriendLoaderData = (): RewardDetails => ({
  date: (new Date().toString() as unknown) as Date,
  currency: "GVT",
  amount: getRandomInteger(1, 100)
});

const ReferralFriendsLoaderData = tableLoaderCreator(
  getReferralFriendLoaderData
);

export const ReferralHistoryTable = React.memo(_ReferralHistoryTable);
