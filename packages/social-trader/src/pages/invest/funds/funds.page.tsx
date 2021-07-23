import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import NavigationTabs from "components/navigation-tabs/navigation-tabs";
import Page from "components/page/page";
import { LIST_VIEW } from "components/table/table.constants";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import { useTranslation } from "i18n";
import FundsTableSSR from "modules/funds-table/components/funds-table/funds-table-ssr";
import * as React from "react";
import {
  FUNDS_EXPLORE_TAB_NAME,
  FUNDS_FACET_FOLDER_ROUTE,
  FUNDS_FAVORITES_TAB_NAME,
  FUNDS_TAB_ROUTE
} from "routes/funds.routes";
import { GV_FUNDS_ROUTE, INVEST_ROUTE } from "routes/invest.routes";
import { composeFundFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

interface Props {
  data: FundDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const FundsPage: React.FC<Props> = ({ data, outerView }) => {
  const { t } = useTranslation();
  const title = t("funds-page:title");
  const description = t("funds-page:description");
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
          { href: GV_FUNDS_ROUTE, label: t("navigation.gv-funds") }
        ]}
      />
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
      <DefaultTableBlock>
        <FundsTableSSR
          data={data}
          outerView={outerView}
          title={t("funds-page:all-funds")}
          showSwitchView
        />
      </DefaultTableBlock>
    </Page>
  );
};

export default FundsPage;
