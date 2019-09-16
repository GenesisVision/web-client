import { NextComponentType } from "next";
import React from "react";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabs from "shared/components/navigation-tabs/navigation-tabs";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { useTranslation } from "shared/i18n";
import ProgramsTableSSR from "shared/modules/programs-table/components/programs-table/programs-table-ssr";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FACET_FOLDER_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "../../routes/programs.routes";

const ProgramsPage: NextComponentType = () => {
  const { t } = useTranslation();
  const title = t("programs-page.title");

  return (
    <Page title={title}>
      <NavigationTabs
        exploreTabName={PROGRAMS_EXPLORE_TAB_NAME}
        tabRoute={PROGRAMS_TAB_ROUTE}
        favoritesTabName={PROGRAMS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        key={"facets"}
        fileRoute={PROGRAMS_FACET_FOLDER_ROUTE}
        title={title}
        assetsFacets={ASSETS_FACETS.PROGRAMS}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <Surface className="programs-table-container" key={"table"}>
        <ProgramsTableSSR
          showSwitchView
          title={t("programs-page.programs-table")}
        />
      </Surface>
    </Page>
  );
};

export default ProgramsPage;
