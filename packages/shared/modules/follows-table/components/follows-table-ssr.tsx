import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Push } from "shared/components/link/link";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import { TAG_FILTER_NAME } from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { calculateTotalPages } from "shared/components/table/helpers/paging.helpers";
import useRouteFilters from "shared/hooks/route-filters.hook";
import { composeCurrencyMap } from "shared/modules/programs-table/components/programs-table/program-table.helpers";
import {
  CURRENCY_MAP_NAME,
  SORTING_FILTER_NAME,
  SORTING_FILTER_VALUE
} from "shared/modules/programs-table/components/programs-table/programs.constants";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  platformCurrenciesSelector,
  programTagsSelector
} from "shared/reducers/platform-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import { toggleFavoriteFollowDispatchable } from "../../favorite-asset/services/favorite-follow.service";
import { followsDataSelector } from "../reducers/follows-table.reducers";
import { composeTypeFilter } from "./follow-table.helpers";
import FollowsTable from "./follows-table";
import {
  DEFAULT_FOLLOW_TABLE_FILTERS,
  FOLLOW_TYPE_FILTER_NAME,
  FOLLOW_TYPES
} from "./follows.constants";

const ITEMS_ON_PAGE = 12;

const _FollowsTableSSR: React.FC<Props> = ({ title, showSwitchView }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const currencies = useSelector(platformCurrenciesSelector);
  const programTags = useSelector(programTagsSelector);
  const data = useSelector(followsDataSelector);
  const { t } = useTranslation();

  const [filtering, sorting, page, update] = useRouteFilters(
    DEFAULT_FOLLOW_TABLE_FILTERS
  );

  if (!data) return null;
  const totalPages = calculateTotalPages(data.total, ITEMS_ON_PAGE);
  return (
    <FollowsTable
      showSwitchView={showSwitchView}
      title={title}
      data={data.programs}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={value => update({ name: SORTING_FILTER_NAME, value })}
      filtering={filtering}
      updateFilter={update}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={CURRENCY_MAP_NAME}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[CURRENCY_MAP_NAME]}
            values={composeCurrencyMap(currencies)}
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
      )}
      renderFilters={(updateFilter, filtering: FilteringType) => (
        <>
          <TagFilter
            name={TAG_FILTER_NAME}
            value={filtering[TAG_FILTER_NAME] as string[]}
            values={programTags}
            onChange={updateFilter}
          />
          <SelectFilter
            name={FOLLOW_TYPE_FILTER_NAME}
            label={t("follows-page.filters." + FOLLOW_TYPE_FILTER_NAME)}
            value={filtering[FOLLOW_TYPE_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={composeTypeFilter(FOLLOW_TYPES)}
            onChange={updateFilter}
          />
        </>
      )}
      paging={{
        totalPages: totalPages,
        currentPage: page,
        itemsOnPage: ITEMS_ON_PAGE,
        totalItems: data.total
      }}
      updatePaging={page => update({ name: "page", value: page + 1 })}
      toggleFavorite={(id: string, isFavorite: boolean) =>
        dispatch(toggleFavoriteFollowDispatchable(id, isFavorite))
      }
      redirectToLogin={() => Push(LOGIN_ROUTE)}
      isAuthenticated={isAuthenticated}
    />
  );
};

interface Props {
  showSwitchView: boolean;
  title: string;
}

const FollowsTableSsr = React.memo(_FollowsTableSSR);
export default FollowsTableSsr;
