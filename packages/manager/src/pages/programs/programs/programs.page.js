import React from "react";
import { translate } from "react-i18next";
import FacetCardsContainer from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import ProgramsTableSektion from "shared/modules/programs-table/components/programs-table/programs-table-section";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

import * as routes from "../programs.routes";

const ProgramsPage = ({ t }) => {
  const title = t("programs-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={routes.PROGRAMS_EXPLORE_TAB_NAME}
        fundsTabRoute={routes.PROGRAMS_TAB_ROUTE}
        fundsFavoritesTabName={routes.PROGRAMS_FAVORITES_TAB_NAME}
      />

      <FacetCardsContainer
        title={title}
        assetsFacets={"programsFacets"}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <ProgramsTableSektion
        showSwitchView
        title={t("programs-page.programs-table")}
      />
    </Page>
  );
};

export default translate()(ProgramsPage);
