import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  GetItemsFuncType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import FundsTableModule from "modules/funds-table/components/funds-table/funds-table-module";
import { FUNDS_TABLE_COLUMNS } from "modules/funds-table/components/funds-table/funds-table.constants";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING
} from "../manager.constants";
import { fetchManagerFunds } from "../services/manager.service";

interface Props {
  ownerId: string;
  title: string;
}

const _ManagerFunds: React.FC<Props> = ({ title, ownerId }) => {
  const [t] = useTranslation();
  const showIn = useSelector(currencySelector);
  const getManagerFunds: GetItemsFuncType = useCallback(
    filters => fetchManagerFunds({ ...filters, ownerId, showIn }),
    [ownerId]
  );

  return (
    <FundsTableModule
      disableTitle
      title={title}
      getItems={getManagerFunds}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={DEFAULT_PAGING}
      columns={FUNDS_TABLE_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.fund-start")}
        />
      )}
    />
  );
};

const ManagerFunds = React.memo(_ManagerFunds);
export default ManagerFunds;
