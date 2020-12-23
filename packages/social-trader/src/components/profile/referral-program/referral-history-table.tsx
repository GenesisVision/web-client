import DownloadButton from "components/download-button/download-button";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DateRangeFilterType
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "components/table/components/table-cell";
import TableModule from "components/table/components/table-module";
import TableRow from "components/table/components/table-row";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { RewardDetails } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  REFERRAL_HISTORY_DEFAULT_FILTERS,
  REFERRAL_HISTORY_FILTERING
} from "reducers/profile-reducer";
import filesService from "services/file-service";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";
import { getRandomInteger, tableLoaderCreator } from "utils/helpers";

import { getHistoryTable } from "./services/referral-program-services";

const _ReferralHistoryTable: React.FC = () => {
  const [t] = useTranslation();
  return (
    <TableModule
      name={"ReferralHistoryTable"}
      cache
      loaderData={ReferralHistoryLoaderData}
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadReferralHistoryButton dateRange={filtering!.dateRange} />
      )}
      title={t("profile-page:referral-program.referral-history.title")}
      getItems={getHistoryTable}
      filtering={REFERRAL_HISTORY_FILTERING}
      defaultFilters={REFERRAL_HISTORY_DEFAULT_FILTERS}
      columns={COLUMNS}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      renderHeader={column =>
        t(
          `profile-page:referral-program.referral-history.header.${column.name}`
        )
      }
      renderBodyRow={(reward: RewardDetails) => (
        <TableRow stripy>
          <TableCell>
            {formatValue(reward.amount, DEFAULT_DECIMAL_SCALE)}{" "}
            {reward.currency}
          </TableCell>
          <TableCell>{formatDate(reward.date)}</TableCell>
        </TableRow>
      )}
    />
  );
};

const _DownloadReferralHistoryButton: React.FC<{
  dateRange: DateRangeFilterType;
}> = ({ dateRange }) => {
  const loadFile = useCallback(() => {
    const dateNow = dayjs(new Date()).format("YYYY-MM-DD_HH-mm-ss");
    filesService
      .getReferralHistoryFile(dateRange)
      .then(blob => saveAs(blob, `referral_history_statistic_${dateNow}.xlsx`));
  }, [dateRange]);
  return <DownloadButton authHandle={loadFile} />;
};
const DownloadReferralHistoryButton = React.memo(
  _DownloadReferralHistoryButton
);

const COLUMNS = [
  {
    name: "value"
  },
  {
    name: "date"
  }
];

const getReferralHistoryLoaderData = (): RewardDetails => ({
  date: (new Date().toString() as unknown) as Date,
  currency: "GVT",
  amount: getRandomInteger(1, 100)
});

export const ReferralHistoryLoaderData = tableLoaderCreator(
  getReferralHistoryLoaderData
);

export const ReferralHistoryTable = React.memo(_ReferralHistoryTable);
