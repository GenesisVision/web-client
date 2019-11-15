import "./follows-facet.scss";

import { ItemsViewModelFollowDetailsList } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import FacetContainer, {
  FACET_ASSET
} from "shared/components/facet-container/facet-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { fetchFollows } from "shared/modules/follows-table/services/follows-table.service";

import FollowsFacetTable from "./components/follows-facet-table";

const _ProgramsFacetPage: React.FC<Props> = ({ t, id }) => {
  const getFollows = useCallback(
    (
      filters: ComposeFiltersAllType
    ): Promise<ItemsViewModelFollowDetailsList> =>
      fetchFollows({
        ...filters
      }),
    []
  );

  return (
    <Page title={t("follows-page.title")}>
      <Surface className="programs-table-container">
        <FacetContainer
          id={id}
          asset={FACET_ASSET.FOLLOWS}
          TableContainer={FollowsFacetTable}
          getItems={getFollows}
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
