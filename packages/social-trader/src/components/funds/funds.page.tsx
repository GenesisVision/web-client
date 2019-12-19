import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import Page from "components/page/page";
import Surface from "components/surface/surface";
import FundsTableSSR from "modules/funds-table/components/funds-table/funds-table-ssr";
import Head from "next/head";
import * as React from "react";
import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FACET_FOLDER_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "routes/funds.routes";
import { Organization, Table } from "schema-dts";
import { useTranslation } from "shared/i18n";
import { composeFundFacetUrl } from "utils/compose-url";
import {
  getFundsTable,
  getOrganizationSchema,
  schema,
  titleMeta
} from "utils/seo";

import NavigationTabs from "../navigation-tabs/navigation-tabs";

const FundsPage: React.FC = () => {
  const { t } = useTranslation();
  const title = t("funds-page.title");
  return (
    <Page title={title}>
      <Head>
        {schema<Organization>(getOrganizationSchema())}
        {schema<Table>(getFundsTable())}
        {titleMeta("Genesis vision")}
      </Head>
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
