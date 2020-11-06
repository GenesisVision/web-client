import { ManagerFollowHistoryRow } from "components/manager/manager-history/manager-follow-history-row";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "components/table/components/table-module";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { userFollowListLoaderData } from "modules/follows-table/components/follow-table.loader-data";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerFollow } from "../services/manager.service";

interface Props {
  subscriberId?: string;
  ownerId?: string;
  title: string;
}

const _ManagerFollow: React.FC<Props> = ({ title, subscriberId, ownerId }) => {
  const [t] = useTranslation();
  const getManagerFollow: GetItemsFuncType = useCallback(
    filters => fetchManagerFollow({ ...filters, subscriberId, ownerId }),
    [ownerId]
  );

  return (
    <TableModule
      name={"ManagerFollow" + ownerId}
      cache
      loaderData={userFollowListLoaderData}
      columns={[{ name: "" }]}
      title={title}
      getItems={getManagerFollow}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={{ ...DEFAULT_PAGING, itemsOnPage: 4 }}
      sorting={MANAGER_SORTING}
      renderBodyRow={asset => <ManagerFollowHistoryRow asset={asset} />}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.follow-start")}
        />
      )}
    />
  );
};

const ManagerFollow = React.memo(_ManagerFollow);
export default ManagerFollow;
