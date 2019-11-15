import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING,
  MANAGER_SORTING
} from "../manager.constants";
import { fetchManagerPrograms } from "../services/manager.service";

const _ManagerPrograms: React.FC<Props> = ({ title, ownerId }) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const getManagerPrograms: GetItemsFuncType = useCallback(
    filters => fetchManagerPrograms({ ...filters, ownerId }),
    [ownerId]
  );

  const toggleFavorite: TableToggleFavoriteType = useCallback(
    (program, updateRow) => () => {
      const isFavorite = program.personalDetails.isFavorite;
      const newProgram = {
        ...program,
        personalDetails: { ...program.personalDetails, isFavorite: !isFavorite }
      };
      updateRow(newProgram);
      toggleFavoriteProgram({ id: program.id, isFavorite }).catch(() => {
        updateRow(program);
      });
    },
    []
  );

  return (
    <ProgramTableModule
      disableTitle
      title={title}
      getItems={getManagerPrograms}
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
      toggleFavorite={toggleFavorite}
      isAuthenticated={isAuthenticated}
    />
  );
};

interface Props {
  ownerId: string;
  title: string;
}

const ManagerPrograms = React.memo(_ManagerPrograms);
export default ManagerPrograms;
