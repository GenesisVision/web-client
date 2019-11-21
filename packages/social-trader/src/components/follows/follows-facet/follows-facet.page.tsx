import "./follows-facet.scss";

import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import Surface from "components/surface/surface";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelFollowDetailsList } from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

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
