import { RewardDetails } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import {
  referralFriendsTableSelector,
  referralHistoryTableSelector
} from "shared/reducers/profile-reducer";
import { formatDate } from "shared/utils/dates";

import { getHistoryTable } from "./services/referral-program-services";

const _ReferralHistoryTable: React.FC = () => {
  const [t] = useTranslation();
  return (
    <TableContainer
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
            {formatDate(reward.amount)} {reward.currency}
          </TableCell>
          <TableCell>{reward.date}</TableCell>
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

export const ReferralHistoryTable = React.memo(_ReferralHistoryTable);
