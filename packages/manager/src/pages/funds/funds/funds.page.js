import React from "react";
import { translate } from "react-i18next";
import FacetCardsContainer from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import FundsTableContainer from "shared/modules/funds-table/components/funds-table/funds-table-container";
import { composeFundFacetUrl } from "shared/utils/compose-url";

import * as routes from "../funds.routes";

const FundsPage = ({ t }) => {
  const title = t("funds-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={routes.FUNDS_EXPLORE_TAB_NAME}
        fundsTabRoute={routes.FUNDS_TAB_ROUTE}
        fundsFavoritesTabName={routes.FUNDS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        title={title}
        assetsFacets={"fundsFacets"}
        composeFacetUrl={composeFundFacetUrl}
      />
      <Surface className="funds-table-container">
        <FundsTableContainer title={"All funds"} />
      </Surface>
    </Page>
  );
};

export default translate()(FundsPage);
