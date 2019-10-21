import { LevelInfo } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import FacetContainer, {
  FACET_ASSET
} from "shared/components/facet-container/facet-container";
import GVButton from "shared/components/gv-button";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";

import LevelIcon from "../programs/program-details/program-details-description/about-levels/level-icon";
import { fetchInvestmentsLevels } from "../programs/program-details/services/program-details.service";
import ProgramsFacetTable from "../programs/programs-facet/components/programs-facet-table";
import { getCurrentFacet } from "../programs/programs-facet/services/programs-facet.service";
import { PROGRAMS_COLUMNS } from "./program-rating.constants";

const _ProgramsRating: React.FC<WithTranslation> = ({ t }) => {
  const [levels, setLevels] = useState<LevelInfo[]>([]);
  const [level, setLevel] = useState<number | undefined>(undefined);

  const updateLevel = (newLevel: number) => {
    newLevel === level ? setLevel(undefined) : setLevel(newLevel);
  };

  useEffect(() => {
    const request = fetchInvestmentsLevels("GVT").then(setLevels);
    return () => {
      request.cancel();
    };
  }, []);

  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchPrograms({
        ...filters,
        sorting: "ByLevelProgressDesc",
        levelsSet: level ? [level] : undefined
      }),
    [level]
  );

  return (
    <Page title={t("programs-page.title")}>
      <div className="programs-facet__filter">
        {levels.map((lvl, i) => (
          <GVButton
            className={"programs-facet__button"}
            key={i}
            onClick={() => updateLevel(lvl.level)}
            noPadding
            variant={"text"}
          >
            <LevelIcon levelInfo={lvl} current={lvl.level === level} />
          </GVButton>
        ))}
      </div>
      <Surface className="programs-table-container">
        <FacetContainer
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={props => (
            <ProgramsFacetTable
              {...props}
              level={level}
              columns={PROGRAMS_COLUMNS}
            />
          )}
          getCurrentFacet={getCurrentFacet}
          getItems={getPrograms}
        />
      </Surface>
    </Page>
  );
};

const ProgramsRatingContainer = translate()(React.memo(_ProgramsRating));
export default ProgramsRatingContainer;
