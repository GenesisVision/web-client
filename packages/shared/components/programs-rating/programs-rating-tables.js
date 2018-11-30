import React, { Fragment } from "react";
import { translate } from "react-i18next";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

const ProgramsRatingTables = ({ t, id, tab, levelData }) => (
  <Fragment>
    {id && (
      <ProgramsRatingTable
        tab={tab}
        title={t("rating.self-pretendents-title")}
        managerId={id}
      />
    )}
    {levelData && <ProgramsRatingStats levelData={levelData} />}
    <ProgramsRatingTable tab={tab} title={t("rating.pretendents-title")} />
  </Fragment>
);

export default translate()(ProgramsRatingTables);
