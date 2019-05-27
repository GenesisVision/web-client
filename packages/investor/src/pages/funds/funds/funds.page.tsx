import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import FundsTableContainer from "shared/modules/funds-table/components/funds-table/funds-table-container";
import { composeFundFacetUrl } from "shared/utils/compose-url";

import * as routes from "../funds.routes";

const _FundsPage: React.FC<InjectedTranslateProps> = ({ t }) => {
  const title = t("funds-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={routes.FUNDS_EXPLORE_TAB_NAME}
        tabRoute={routes.FUNDS_TAB_ROUTE}
        favoritesTabName={routes.FUNDS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        title={title}
        assetsFacets={ASSETS_FACETS.FUNDS}
        composeFacetUrl={composeFundFacetUrl}
      />
      <Surface className="funds-table-container">
        <FundsTableContainer title={t("funds-page.all-funds")} />
      </Surface>
    </Page>
  );
};

const FundsPage = React.memo(translate()(_FundsPage));
export default FundsPage;
