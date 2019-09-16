import * as React from "react";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { useTranslation } from "shared/i18n";
import FundsTableSSR from "shared/modules/funds-table/components/funds-table/funds-table-ssr";
import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FACET_FOLDER_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "shared/routes/funds.routes";
import { composeFundFacetUrl } from "shared/utils/compose-url";

import NavigationTabs from "../navigation-tabs/navigation-tabs";

const FundsPage: React.FC = () => {
  const { t } = useTranslation();
  const title = t("funds-page.title");
  return (
    <Page title={title}>
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
      <Surface className="funds-table-container">
        <FundsTableSSR title={t("funds-page.all-funds")} showSwitchView />
      </Surface>
    </Page>
  );
};

export default FundsPage;
