import React, { Fragment } from "react";
import { translate } from "react-i18next";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

const ProgramsRatingTables = ({ t, id, tab }) => (
  <Fragment>
    {id && (
      <ProgramsRatingTable
        tab={tab.level}
        title={t("rating.self-pretendents-title")}
        managerId={id}
      />
    )}
    <ProgramsRatingStats levelData={tab} />
    <ProgramsRatingTable tab={tab.level} />
  </Fragment>
);

export default translate()(ProgramsRatingTables);
