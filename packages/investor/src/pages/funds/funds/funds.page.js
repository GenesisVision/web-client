import Page from "shared/components/page/page";
import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import React from "react";
import { translate } from "react-i18next";

import FacetCardsContainer from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
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
      <FacetCardsContainer title={title} assetsFacets={"fundsFacets"} />
      <FundsTableContainer title={"All funds"} />
    </Page>
  );
};

export default translate()(FundsPage);
