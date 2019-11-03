import "./follows-facet.scss";

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

import FollowsFacetTable from "./components/follows-facet-table";

const _ProgramsFacetPage: React.FC<Props> = ({ t, id }) => {
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
          id={id}
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={FollowsFacetTable}
          getItems={getPrograms}
        />
      </Surface>
    </Page>
  );
};

interface Props extends WithTranslation {
  id: string;
}

const FollowsFacetPage = translate()(React.memo(_ProgramsFacetPage));
export default FollowsFacetPage;
