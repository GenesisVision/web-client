import { ProgramFacetTimeframeEnum } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import FundsTableModule from "shared/modules/funds-table/components/funds-table/funds-table-module";

import {
  FUNDS_FACET_PAGING,
  FUNDS_FACET_TABLE_FILTERS
} from "./funds-facet.constants";

class _FundsFacetTable extends React.PureComponent<
  IFundsFacetTableProps & InjectedTranslateProps
> {
  toggleFavorite: TableToggleFavoriteType = (fund, updateRow) => () => {
    const isFavorite = fund.personalDetails.isFavorite;
    const newProgram = {
      ...fund,
      personalDetails: { ...fund.personalDetails, isFavorite: !isFavorite }
    };
    updateRow(newProgram);
    toggleFavoriteFund(fund.id, isFavorite).catch(() => {
      updateRow(fund);
    });
  };

  composeFiltering = () => {
    const type = mapServerTimeFrameToFilterType(this.props.timeframe);
    return {
      dateRange: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type
      }
    } as FilteringType;
  };

  render() {
    const { t, title, sorting, getItems, isAuthenticated } = this.props;

    return (
      <FundsTableModule
        renderFilters={(updateFilter, filtering) => (
          <>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </>
        )}
        title={title}
        paging={FUNDS_FACET_PAGING}
        sorting={sorting}
        filtering={this.composeFiltering()}
        defaultFilters={FUNDS_FACET_TABLE_FILTERS}
        toggleFavorite={this.toggleFavorite}
        getItems={getItems}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

export interface IFundsFacetTableProps {
  title: string;
  sorting: string;
  timeframe: ProgramFacetTimeframeEnum;
  getItems: GetItemsFuncType;
  isAuthenticated: boolean;
}

const FundsFacetTable = translate()(_FundsFacetTable);
export default FundsFacetTable;
