import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import NavigationTabs from "components/navigation-tabs/navigation-tabs";
import Page from "components/page/page";
import { LIST_VIEW } from "components/table/table.constants";
import { ProgramDetailsListItemItemsViewModel } from "gv-api-web";
import { useTranslation } from "i18n";
import ProgramsTableSSR from "modules/programs-table/components/programs-table/programs-table-ssr";
import { NextPage } from "next";
import React from "react";
import { GV_PROGRAMS_ROUTE, INVEST_ROUTE } from "routes/invest.routes";
import {
  PROGRAMS_EXPLORE_TAB_NAME,
  PROGRAMS_FACET_FOLDER_ROUTE,
  PROGRAMS_FAVORITES_TAB_NAME,
  PROGRAMS_TAB_ROUTE
} from "routes/programs.routes";
import { composeProgramFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

interface Props {
  data: ProgramDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const ProgramsPage: NextPage<Props> = ({ data, outerView }) => {
  const { t } = useTranslation();
  const title = t("programs-page:title");
  const description = t("programs-page:description");
  return (
    <Page
      description={description}
      showTitle
      title={title}
      schemas={[
        ORGANIZATION_SCHEMA,
        {
          "@context": "https://schema.org",
          "@type": "Table",
          about: description
        }
      ]}
    >
      <BreadCrumbs
        items={[
          { href: INVEST_ROUTE, label: t("navigation.invest") },
          { href: GV_PROGRAMS_ROUTE, label: t("navigation.gv-programs") }
        ]}
      />
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
      <DefaultTableBlock>
        <ProgramsTableSSR data={data} outerView={outerView} showSwitchView />
      </DefaultTableBlock>
    </Page>
  );
};

export default ProgramsPage;
