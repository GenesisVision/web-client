import "./programs-facet.scss";

import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import FacetContainer, {
  FACET_ASSET
} from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";

import ProgramsFacetTable from "./components/programs-facet-table";
import { getCurrentFacet } from "./services/programs-facet.service";

const _ProgramsFacetPage: React.FC<WithTranslation> = ({ t }) => {
  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchPrograms({
        ...filters
      }),
    []
  );

  return (
    <Page title={t("programs-page.title")}>
      <Surface className="programs-table-container">
        <FacetContainer
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={ProgramsFacetTable}
          getCurrentFacet={getCurrentFacet}
          getItems={getPrograms}
        />
      </Surface>
    </Page>
  );
};

const ProgramsFacetPage = translate()(React.memo(_ProgramsFacetPage));
export default ProgramsFacetPage;
