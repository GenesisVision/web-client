import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import ProgramsFacetTable from "./components/programs-facet-table";

const _ProgramsFacetPage: React.FC<Props> = ({ t, id }) => {
  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchPrograms({
        ...filters
      }),
    []
  );

  return (
    <Page
      description={`${t("programs-page.title")} ${t(
        `facets.${id}`
      )} facet list`}
      showTitle
      title={`${t("programs-page.title")} ${t(`facets.${id}`)}`}
    >
      <DefaultTableBlock>
        <FacetContainer
          id={id}
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={ProgramsFacetTable}
          getItems={getPrograms}
        />
      </DefaultTableBlock>
    </Page>
  );
};

interface Props extends WithTranslation {
  id: string;
}

const ProgramsFacetPage = translate()(React.memo(_ProgramsFacetPage));
export default ProgramsFacetPage;
