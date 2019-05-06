import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { INavigateTab } from "./programs-rating-container";
import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

const _ProgramsRatingTables: React.FC<Props> = ({ t, id, tab, title }) => (
  <>
    {id && (
      <ProgramsRatingTable
        tab={String(tab.level)}
        title={t("rating-page.self-pretendents-title")}
        managerId={id}
      />
    )}
    <ProgramsRatingStats levelData={tab} />
    <ProgramsRatingTable tab={String(tab.level)} title={title} disableTitle />
  </>
);

interface Props extends InjectedTranslateProps {
  id: string;
  tab: INavigateTab;
  title: string;
}

const ProgramsRatingTables = React.memo(translate()(_ProgramsRatingTables));
export default ProgramsRatingTables;
