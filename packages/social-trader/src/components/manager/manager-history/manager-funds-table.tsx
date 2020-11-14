import { ManagerFundHistoryRow } from "components/manager/manager-history/manager-fund-history-row";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import {
  GetItemsFuncType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { userFundListLoaderData } from "modules/funds-table/components/funds-table/fund-table.loader-data";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerFunds } from "../services/manager.service";

interface Props {
  investorId?: string;
  ownerId?: string;
  title: string;
}

const _ManagerFunds: React.FC<Props> = ({ title, investorId, ownerId }) => {
  const [t] = useTranslation();
  const showIn = useAccountCurrency();
  const getManagerFunds: GetItemsFuncType = useCallback(
    filters => fetchManagerFunds({ ...filters, investorId, ownerId, showIn }),
    [ownerId]
  );

  return (
    <TableModule
      name={"ManagerFunds" + ownerId}
      cache
      loaderData={userFundListLoaderData}
      columns={[{ name: "" }]}
      title={title}
      getItems={getManagerFunds}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={{ ...DEFAULT_PAGING, itemsOnPage: 4 }}
      sorting={MANAGER_SORTING}
      renderBodyRow={asset => <ManagerFundHistoryRow asset={asset} />}
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
