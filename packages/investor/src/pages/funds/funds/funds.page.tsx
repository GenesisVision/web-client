import * as React from "react";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "shared/components/facet-cards/faset-cards-container";
import NavigationTabsContainer from "shared/components/navigation-tabs/navigation-tabs-container";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import { WithTranslation, withTranslation } from "shared/i18n";
import FundsTableContainer from "shared/modules/funds-table/components/funds-table/funds-table-container";
import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "shared/routes/funds.routes";
import { composeFundFacetUrl } from "shared/utils/compose-url";

const _FundsPage: React.FC<WithTranslation> = ({ t }) => {
  const title = t("funds-page.title");
  return (
    <Page title={title}>
      <NavigationTabsContainer
        exploreTabName={FUNDS_EXPLORE_TAB_NAME}
        tabRoute={FUNDS_TAB_ROUTE}
        favoritesTabName={FUNDS_FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        title={title}
        assetsFacets={ASSETS_FACETS.FUNDS}
        composeFacetUrl={composeFundFacetUrl}
      />
      {/*<Surface className="funds-table-container">*/}
      {/*  <FundsTableContainer title={t("funds-page.all-funds")} />*/}
      {/*</Surface>*/}
    </Page>
  );
};

const FundsPage = withTranslation()(React.memo(_FundsPage));
export default FundsPage;
