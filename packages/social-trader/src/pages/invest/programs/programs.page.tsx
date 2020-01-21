import DetailsBlock from "components/details/details-block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import NavigationTabs from "components/navigation-tabs/navigation-tabs";
import Page from "components/page/page";
import { useTranslation } from "i18n";
import ProgramsTableSSR from "modules/programs-table/components/programs-table/programs-table-ssr";
import { NextPage } from "next";
import React from "react";
import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FACET_FOLDER_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "routes/programs.routes";
import { composeProgramFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

const ProgramsPage: NextPage = () => {
  const { t } = useTranslation();
  const title = t("programs-page.title");

  return (
    <Page
      showTitle
      title={title}
      schemas={[
        ORGANIZATION_SCHEMA,
        {
          "@context": "https://schema.org",
          "@type": "Table",
          about: "List of programs"
        }
      ]}
    >
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
      <DetailsBlock table key={"table"}>
        <ProgramsTableSSR showSwitchView />
      </DetailsBlock>
    </Page>
  );
};

export default ProgramsPage;
