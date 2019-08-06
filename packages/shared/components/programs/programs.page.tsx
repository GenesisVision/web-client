import { ProgramsList } from "gv-api-web";
import { NextComponentType } from "next";
import React, { useContext } from "react";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { useTranslation } from "shared/i18n";
import ProgramsTableSSR from "shared/modules/programs-table/components/programs-table/programs-table-ssr";
import { composeProgramFacetUrl } from "shared/utils/compose-url";

import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "../../routes/programs.routes";

const _ProgramsPage: NextComponentType<{}, InitialProps, InitialProps> = ({
  programs
}) => {
  const { t } = useTranslation();
  const title = t("programs-page.title");

  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={PROGRAMS_EXPLORE_TAB_NAME}
        tabRoute={PROGRAMS_TAB_ROUTE}
        favoritesTabName={PROGRAMS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        key={"facets"}
        title={title}
        assetsFacets={ASSETS_FACETS.PROGRAMS}
        composeFacetUrl={composeProgramFacetUrl}
      />
      <Surface className="programs-table-container" key={"table"}>
        <ProgramsTableSSR
          data={programs}
          showSwitchView
          title={t("programs-page.programs-table")}
        />
      </Surface>
    </Page>
  );
};

const ProgramsPage = _ProgramsPage;
export default ProgramsPage;

interface InitialProps {
  programs: ProgramsList;
}
