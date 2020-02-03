import DetailsBlock from "components/details/details-block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import Page from "components/page/page";
import { useTranslation } from "i18n";
import FundsTableSSR from "modules/funds-table/components/funds-table/funds-table-ssr";
import * as React from "react";
import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FACET_FOLDER_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "routes/funds.routes";
import { composeFundFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

import NavigationTabs from "../navigation-tabs/navigation-tabs";

const FundsPage: React.FC = () => {
  const { t } = useTranslation();
  const title = t("funds-page.title");
  return (
    <Page
      description={t("funds-page.description")}
      showTitle
      title={title}
      schemas={[
        ORGANIZATION_SCHEMA,
        {
          "@context": "https://schema.org",
          "@type": "Table",
          about: "List of funds"
        }
      ]}
    >
      <NavigationTabs
        exploreTabName={FUNDS_EXPLORE_TAB_NAME}
        tabRoute={FUNDS_TAB_ROUTE}
        favoritesTabName={FUNDS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        title={title}
        assetsFacets={ASSETS_FACETS.FUNDS}
        composeFacetUrl={composeFundFacetUrl}
        fileRoute={FUNDS_FACET_FOLDER_ROUTE}
      />
      <DetailsBlock table>
        <FundsTableSSR title={t("funds-page.all-funds")} showSwitchView />
      </DetailsBlock>
    </Page>
  );
};

export default FundsPage;
