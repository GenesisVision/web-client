import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";
import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerPrograms } from "../services/manager.service";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { FundDetails } from "gv-api-web";
import { IUpdateRowFunc } from "shared/components/table/components/table.types";
import { IDataModel } from "shared/constants/constants";

interface Props {
  managerId: string;
  title: string;
  isAuthenticated: boolean;
}

class ManagerPrograms extends React.Component<Props & InjectedTranslateProps> {
  fetchManagerPrograms = (filters: FilteringType): Promise<IDataModel> => {
    const { managerId } = this.props;
    return fetchManagerPrograms({ ...filters, managerId });
  };

  toggleFavorite = (program: FundDetails, updateRow: IUpdateRowFunc) => () => {
    const isFavorite = program.personalDetails.isFavorite;
    const newProgram = {
      ...program,
      personalDetails: { ...program.personalDetails, isFavorite: !isFavorite }
    };
    updateRow(newProgram);
    toggleFavoriteProgram(program.id, isFavorite).catch(() => {
      updateRow(program);
    });
  };

  render() {
    const { t, title, isAuthenticated } = this.props;
    return (
      <ProgramTableModule
        disableTitle
        title={title}
        getItems={this.fetchManagerPrograms}
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
        toggleFavorite={this.toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

export default translate()(ManagerPrograms);
