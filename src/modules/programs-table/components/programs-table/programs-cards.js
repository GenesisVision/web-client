import "./programs.scss";

import { Table, TableHeadCell } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import LevelFilter from "modules/table/components/filtering/level-filter/level-filter";
import SelectFilter from "modules/table/components/filtering/select-filter/select-filter";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import FacetCards from "../../../../pages/programs/programs/components/facet-cards/facet-cards";
import FacetCardsStub from "../../../../pages/programs/programs/components/facet-cards/facet-cards-stub";
import {
  CURRENCY_FILTER_VALUES,
  PROGRAMS_COLUMNS
} from "../../programs.constants";
import ProgramCard from "./program-card";
import ProgramTableRow from "./program-table-row";

const selectFilterValues = [
  { value: undefined, label: "All" },
  ...CURRENCY_FILTER_VALUES.map(x => ({ value: x, label: x }))
];

const ProgramsCards = ({
  t,
  data,
  isPending,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated
}) => {
  if (!data) return null;
  return (
    <div className="programs-cards">
      {data.map(program => (
        <ProgramCard program={program} />
      ))}
    </div>
  );
};

export default translate()(ProgramsCards);
