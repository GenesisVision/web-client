import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { FUND_ASSET_FILTER_NAME } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import { FundAssetFilterContainer } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.container";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { composePaging } from "components/table/helpers/paging.helpers";
import { LIST_VIEW } from "components/table/table.constants";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useRouteFilters from "hooks/route-filters.hook";
import { useTranslation } from "i18n";
import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  fundAssetsSelector,
  platformCurrenciesSelector
} from "reducers/platform-reducer";

import FundsTable from "./funds-table";
import {
  CURRENCY_MAP_NAME,
  DEFAULT_FUND_TABLE_FILTERS,
  DEFAULT_ITEMS_ON_PAGE,
  SORTING_FILTER_VALUE
} from "./funds-table.constants";

const _FundsTableSSR: React.FC<Props> = ({
  data,
  outerView,
  showSwitchView
}) => {
  const currency = useAccountCurrency();
  const currencies = useSelector(platformCurrenciesSelector);
  const fundAssets = useSelector(fundAssetsSelector);
  const { t } = useTranslation();
  const [
    filtering,
    sorting,
    page,
    update,
    updateSorting,
    updatePaging
  ] = useRouteFilters(DEFAULT_FUND_TABLE_FILTERS, [
    CURRENCY_MAP_NAME,
    DATE_RANGE_FILTER_NAME
  ]);
  if (!filtering[CURRENCY_MAP_NAME]) {
    filtering[CURRENCY_MAP_NAME] = currency;
  }

  const renderMappings = useCallback(
    (updateFilter, filtering) => (
      <>
        <SelectFilter
          name={CURRENCY_MAP_NAME}
          label={t("filters.currency.show-in")}
          value={filtering && filtering[CURRENCY_MAP_NAME]}
          values={currencies.map(x => ({ value: x.name, label: x.name }))}
          onChange={updateFilter}
        />
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          label={t("filters.date-range.for")}
          startLabel={t("filters.date-range.fund-start")}
        />
      </>
    ),
    [currencies]
  );
  const renderFilters = useCallback(
    (updateFilter: any, filtering: FilteringType) => (
      <FundAssetFilterContainer
        name={FUND_ASSET_FILTER_NAME}
        value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
        values={fundAssets}
        onChange={updateFilter}
      />
    ),
    [fundAssets]
  );

  if (!data) return null;
  return (
    <FundsTable
      outerView={outerView}
      data={data.items}
      showSwitchView={showSwitchView}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={updateSorting}
      filtering={filtering}
      updateFilter={update}
      renderMappings={renderMappings}
      renderFilters={renderFilters}
      paging={composePaging(data.total, page, DEFAULT_ITEMS_ON_PAGE)}
      updatePaging={updatePaging}
      asLinkPagination={true}
    />
  );
};

interface Props {
  data: FundDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
  showSwitchView: boolean;
  title: string;
}

const FundsTableSSR = React.memo(_FundsTableSSR);
export default FundsTableSSR;
