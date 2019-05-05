import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

const _ProgramsRatingTables: React.FC<Props> = ({ t, id, tab, title }) => (
  <>
    {id && (
      <ProgramsRatingTable
        tab={tab.level}
        title={t("rating-page.self-pretendents-title")}
        managerId={id}
      />
    )}
    <ProgramsRatingStats levelData={tab} />
    <ProgramsRatingTable tab={tab.level} title={title} disableTitle />
  </>
);

interface Props extends InjectedTranslateProps {
  id: string;
  tab: any;
  title: string;
}

const ProgramsRatingTables = React.memo(translate()(_ProgramsRatingTables));
export default ProgramsRatingTables;
