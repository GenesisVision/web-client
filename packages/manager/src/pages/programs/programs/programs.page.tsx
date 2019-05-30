import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import ProgramsTableContainer from "shared/modules/programs-table/components/programs-table/programs-table-container";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "../programs.routes";

const _ProgramsPage: React.FC<InjectedTranslateProps> = ({ t }) => {
  const title = t("programs-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={PROGRAMS_EXPLORE_TAB_NAME}
        tabRoute={PROGRAMS_TAB_ROUTE}
        favoritesTabName={PROGRAMS_FAVORITES_TAB_NAME}
      />

      <FacetCardsContainer
        title={title}
        assetsFacets={ASSETS_FACETS.PROGRAMS}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <Surface className="programs-table-container">
        <ProgramsTableContainer
          showSwitchView
          title={t("programs-page.programs-table")}
        />
      </Surface>
    </Page>
  );
};

const ProgramsPage = React.memo(translate()(_ProgramsPage));
export default ProgramsPage;
