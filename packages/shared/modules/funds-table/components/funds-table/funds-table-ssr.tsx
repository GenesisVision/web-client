import { push } from "connected-react-router";
import { FundsList, PlatformAsset, ProgramsList, ProgramTag } from "gv-api-web";
import { Location } from "history";
import programs from "investor-web-portal/pages/programs";
import { NextPageContext } from "next";
import { NextRouter, useRouter } from "next/router";
import qs from "qs";
import { useContext } from "react";
import * as React from "react";
import { connect, MergeProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose, Dispatch } from "redux";
import { DispatchProps } from "shared/components/asset-status/asset-status-requests";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";
import FundAssetFilter from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import { LevelFilterType } from "shared/components/table/components/filtering/level-filter/level-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import isAuthenticated from "shared/decorators/is-authenticated";
import useRouteFilters from "shared/hooks/route-filters.hook";
import { useTranslation } from "shared/i18n";
import { ToggleFavoriteDispatchableType } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import { programsDataSelector } from "shared/modules/programs-table/reducers/programs-table.reducers";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  fundAssetsSelector,
  programCurrenciesSelector,
  programTagsSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

import { fundsDataSelector } from "../../reducers/funds-table.reducers";
import FundsTable from "./funds-table";

const ITEMS_ON_PAGE = 12;

export const getFiltersFromContext = ({
  asPath = "",
  pathname
}: NextPageContext) => {
  const { page, ...other } = qs.parse(asPath.slice(pathname.length + 1));
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: ITEMS_ON_PAGE,
    currentPage: page
  });
  return {
    ...other,
    ...skipAndTake
  };
};

const defaultFilters = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [FUND_ASSET_FILTER_NAME]: [FUND_ASSET_DEFAULT_VALUE]
};

const _FundsTableSSR: React.FC<Props> = ({
  title,
  data,
  showSwitchView,
  isAuthenticated,
  fundAssets
}) => {
  const { t } = useTranslation();
  const [filtering, sorting, page, update] = useRouteFilters(
    FUNDS_ROUTE,
    defaultFilters
  );
  const { push } = useRouter();

  const totalPages = calculateTotalPages(data.total, ITEMS_ON_PAGE);

  return (
    <FundsTable
      title={title}
      data={data.funds}
      showSwitchView={showSwitchView}
      sorting={sorting}
      //@ts-ignore TODO why update sorting need function with reducer
      updateSorting={update}
      filtering={filtering}
      updateFilter={update}
      renderFilters={(updateFilter: any, filtering: FilteringType) => (
        <>
          <FundAssetFilter
            name={FUND_ASSET_FILTER_NAME}
            value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
            values={fundAssets}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
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
      toggleFavorite={() => {}}
      redirectToLogin={() => push(LOGIN_ROUTE)}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state),
  fundAssets: fundAssetsSelector(state)
});

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//   service: bindActionCreators(
//     {
//       ...programsService,
//       toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
//       redirectToLogin: () => push(LOGIN_ROUTE)
//     },
//     dispatch
//   )
// });

// const mergeProps = (
//   stateProps: StateProps,
//   dispatchProps: DispatchProps,
//   ownProps: RouteComponentProps
// ): StateProps & DispatchProps & RouteComponentProps & MergeProps => {
//   const { location } = ownProps;
//   const isLocationChanged = (prevLocation: Location) => {
//     return location.key !== prevLocation.key;
//   };
//   const filters = dispatchProps.service.getProgramsFilters();
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     ...ownProps,
//     filters,
//     isLocationChanged
//   };
// };

const FundsTableSSR = compose<React.FC<OwnProps>>(
  connect(
    mapStateToProps
    // mapDispatchToProps,
    // mergeProps
  )
)(_FundsTableSSR);
export default FundsTableSSR;

interface OwnProps {
  showSwitchView: boolean;
  title: string;
  defaultFilters?: any;
  data: FundsList;
}

interface StateProps {
  isAuthenticated: boolean;
  fundAssets: PlatformAsset[];
}

interface Props extends OwnProps, StateProps {}
