import { Button } from "components/button/button";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { LevelInfo } from "gv-api-web";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import { fetchInvestmentsLevels } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ProgramsFacetTable from "../../pages/invest/programs/programs-facet/components/programs-facet-table";
import LevelIcon from "../details/details-description-section/about-levels/level-icon";
import { PROGRAMS_COLUMNS } from "./program-rating.constants";

const RATING_FACET_NAME = "most_reliable";

const _ProgramsRating: React.FC = () => {
  const [t] = useTranslation();
  const [levels, setLevels] = useState<LevelInfo[]>([]);
  const [level, setLevel] = useState<number | undefined>(undefined);

  const updateLevel = (newLevel: number) => {
    newLevel === level ? setLevel(undefined) : setLevel(newLevel);
  };

  useEffect(() => {
    fetchInvestmentsLevels("GVT").then(setLevels);
  }, []);

  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchPrograms({
        ...filters,
        sorting: "ByLevelProgressDesc",
        levelMin: level,
        levelMax: level
      }),
    [level]
  );

  return (
    <Page
      description={`${t("programs-page:title")} rating facet list`}
      showTitle
      title={`${t("programs-page:title")} ${t(`asset-list:facets.rating`)}`}
    >
      <Row>
        {levels.map((lvl, i) => (
          <RowItem bottomOffset key={i}>
            <Button
              onClick={() => updateLevel(lvl.level)}
              noPadding
              variant={"text"}
            >
              <LevelIcon level={lvl.level} current={lvl.level === level} />
            </Button>
          </RowItem>
        ))}
      </Row>
      <DefaultTableBlock>
        <FacetContainer
          id={RATING_FACET_NAME}
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={props => (
            <ProgramsFacetTable
              {...props}
              level={level}
              columns={PROGRAMS_COLUMNS}
            />
          )}
          getItems={getPrograms}
        />
      </DefaultTableBlock>
    </Page>
  );
};

const ProgramsRatingContainer = React.memo(_ProgramsRating);
export default ProgramsRatingContainer;
