import "./programs.scss";

import React from "react";
import { translate } from "react-i18next";

import ProgramCard from "./program-card";

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
      {data.programs.map(program => (
        <ProgramCard program={program} />
      ))}
    </div>
  );
};

export default translate()(ProgramsCards);
