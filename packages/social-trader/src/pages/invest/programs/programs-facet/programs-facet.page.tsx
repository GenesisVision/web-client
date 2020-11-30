import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import ProgramsFacetTable from "./components/programs-facet-table";

interface Props {
  id: string;
}

const _ProgramsFacetPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchPrograms({
        ...filters
      }),
    []
  );

  return (
    <Page
      description={`${t("programs-page:title")} ${t(
        `asset-list:facets.${id}`
      )} facet list`}
      showTitle
      title={`${t("programs-page:title")} ${t(`asset-list:facets.${id}`)}`}
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

const ProgramsFacetPage = React.memo(_ProgramsFacetPage);
export default ProgramsFacetPage;
