import { NextComponentType } from "next";
import React from "react";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabs from "shared/components/navigation-tabs/navigation-tabs";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { useTranslation } from "shared/i18n";
import FollowsTableSsr from "shared/modules/follows-table/components/follows-table-ssr";
import {
  EXPLORE_TAB_NAME,
  FAVORITES_TAB_NAME,
  FOLLOW_FACET_FOLDER_ROUTE,
  FOLLOW_TAB_ROUTE
} from "shared/routes/invest.routes";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

const FollowsPage: NextComponentType = () => {
  const { t } = useTranslation();
  const title = t("follows-page.title");

  return (
    <Page title={title}>
      <NavigationTabs
        exploreTabName={EXPLORE_TAB_NAME}
        tabRoute={FOLLOW_TAB_ROUTE}
        favoritesTabName={FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        key={"facets"}
        fileRoute={FOLLOW_FACET_FOLDER_ROUTE}
        title={title}
        assetsFacets={ASSETS_FACETS.PROGRAMS}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <Surface className="programs-table-container" key={"table"}>
        <FollowsTableSsr
          showSwitchView
          title={t("follows-page.table")}
        />
      </Surface>
    </Page>
  );
};

export default FollowsPage;
