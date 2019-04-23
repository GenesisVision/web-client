import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import FundsTableModule from "shared/modules/funds-table/components/funds-table/funds-table-module";

import {
  FUNDS_FACET_PAGING,
  FUNDS_FACET_TABLE_FILTERS,
  FUNDS_FACET_TABLE_REQUEST_FILTERS,
  FUNDS_FACET_TABLE_SORTING
} from "./funds-facet.constants";

class _FundsFacetTable extends React.PureComponent<
  IFundsFacetTableProps & InjectedTranslateProps
> {
  toggleFavorite: TableToggleFavoriteType<any> = (fund, updateRow) => () => {
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

  render() {
    const { t, title, ...other } = this.props;

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
        sorting={FUNDS_FACET_TABLE_SORTING}
        filtering={FUNDS_FACET_TABLE_FILTERS}
        defaultFilters={FUNDS_FACET_TABLE_FILTERS}
        toggleFavorite={this.toggleFavorite}
        {...other}
      />
    );
  }
}

export interface IFundsFacetTableProps {
  title: string;
  getItems: GetItemsFuncType<FUNDS_FACET_TABLE_REQUEST_FILTERS, any>;
  isAuthenticated: boolean;
  showRating?: boolean;
}

const FundsFacetTable = translate()(_FundsFacetTable);
export default FundsFacetTable;
