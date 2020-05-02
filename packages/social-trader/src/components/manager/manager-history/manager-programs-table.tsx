import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import ProgramTableModule from "modules/programs-table/components/programs-table/programs-table-module";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerPrograms } from "../services/manager.service";

const _ManagerPrograms: React.FC<Props> = ({ title, ownerId }) => {
  const [t] = useTranslation();
  const getManagerPrograms: GetItemsFuncType = useCallback(
    filters => fetchManagerPrograms({ ...filters, ownerId }),
    [ownerId]
  );

  return (
    <ProgramTableModule
      title={title}
      getItems={getManagerPrograms}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={DEFAULT_PAGING}
      sorting={MANAGER_SORTING}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
    />
  );
};

interface Props {
  ownerId: string;
  title: string;
}

const ManagerPrograms = React.memo(_ManagerPrograms);
export default ManagerPrograms;
