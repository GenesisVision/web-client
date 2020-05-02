import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import FollowsTableModule from "modules/follows-table/components/follows-table-module";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerFollow } from "../services/manager.service";

const _ManagerFollow: React.FC<Props> = ({ title, ownerId }) => {
  const [t] = useTranslation();
  const getManagerFollow: GetItemsFuncType = useCallback(
    filters => fetchManagerFollow({ ...filters, ownerId }),
    [ownerId]
  );

  return (
    <FollowsTableModule
      title={title}
      getItems={getManagerFollow}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={DEFAULT_PAGING}
      sorting={MANAGER_SORTING}
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

interface Props {
  ownerId: string;
  title: string;
}

const ManagerFollow = React.memo(_ManagerFollow);
export default ManagerFollow;
