import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  GetItemsFuncType,
  TableToggleFavoriteType,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import FundsTableModule from "shared/modules/funds-table/components/funds-table/funds-table-module";
import { FUNDS_TABLE_COLUMNS } from "shared/modules/funds-table/components/funds-table/funds-table.constants";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING
} from "../manager.constants";
import { fetchManagerFunds } from "../services/manager.service";

interface Props {
  managerId: string;
  title: string;
  isAuthenticated: boolean;
}

class _ManagerFunds extends React.PureComponent<
  Props & InjectedTranslateProps
> {
  fetchManagerFunds: GetItemsFuncType = filters =>
    fetchManagerFunds({ ...filters, managerId: this.props.managerId });

  toggleFavorite: TableToggleFavoriteType = (asset, updateRow) => () => {
    const isFavorite = asset.personalDetails.isFavorite;
    const newProgram = {
      ...asset,
      personalDetails: { ...asset.personalDetails, isFavorite: !isFavorite }
    };
    updateRow(newProgram);
    toggleFavoriteFund(asset.id, isFavorite).catch(() => {
      updateRow(asset);
    });
  };

  render() {
    const { t, title, isAuthenticated } = this.props;
    return (
      <FundsTableModule
        disableTitle
        title={title}
        getItems={this.fetchManagerFunds}
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
            startLabel={t("filters.date-range.program-start")}
          />
        )}
        toggleFavorite={this.toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

const ManagerFunds = translate()(_ManagerFunds);
export default ManagerFunds;
