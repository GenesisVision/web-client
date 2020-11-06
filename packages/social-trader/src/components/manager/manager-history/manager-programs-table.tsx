import { ManagerProgramHistoryRow } from "components/manager/manager-history/manager-program-history-row";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "components/table/components/table-module";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { userProgramListLoaderData } from "modules/programs-table/components/programs-table/program-table.loader-data";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerPrograms } from "../services/manager.service";

const _ManagerPrograms: React.FC<Props> = ({ title, investorId, ownerId }) => {
  const [t] = useTranslation();
  const getManagerPrograms: GetItemsFuncType = useCallback(
    filters => fetchManagerPrograms({ ...filters, investorId, ownerId }),
    [ownerId]
  );

  return (
    <TableModule
      name={"ManagerPrograms" + ownerId}
      cache
      loaderData={userProgramListLoaderData}
      columns={[{ name: "" }]}
      title={title}
      getItems={getManagerPrograms}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={{ ...DEFAULT_PAGING, itemsOnPage: 4 }}
      sorting={MANAGER_SORTING}
      renderBodyRow={asset => <ManagerProgramHistoryRow asset={asset} />}
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
  investorId?: string;
  ownerId?: string;
  title: string;
}

const ManagerPrograms = React.memo(_ManagerPrograms);
export default ManagerPrograms;
