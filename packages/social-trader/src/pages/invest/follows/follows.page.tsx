import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import NavigationTabs from "components/navigation-tabs/navigation-tabs";
import Page from "components/page/page";
import { LIST_VIEW } from "components/table/table.constants";
import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { useTranslation } from "i18n";
import FollowsTableSsr from "modules/follows-table/components/follows-table-ssr";
import React from "react";
import {
  EXPLORE_TAB_NAME,
  FAVORITES_TAB_NAME,
  FOLLOW_FACET_FOLDER_ROUTE,
  FOLLOW_TAB_ROUTE,
  GV_FOLLOW_ROUTE,
  INVEST_ROUTE
} from "routes/invest.routes";
import { composeFollowFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

interface Props {
  data: FollowDetailsListItemItemsViewModel;
  outerView?: LIST_VIEW;
}

const FollowsPage: React.FC<Props> = ({ data, outerView }) => {
  const { t } = useTranslation();
  const title = t("follows-page:title");
  const description = t("follows-page:description");
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
          { href: GV_FOLLOW_ROUTE, label: t("navigation.gv-follow") }
        ]}
      />
      <NavigationTabs
        exploreTabName={EXPLORE_TAB_NAME}
        tabRoute={FOLLOW_TAB_ROUTE}
        favoritesTabName={FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        key={"facets"}
        fileRoute={FOLLOW_FACET_FOLDER_ROUTE}
        title={title}
        assetsFacets={ASSETS_FACETS.FOLLOWS}
        composeFacetUrl={composeFollowFacetUrl}
      />
      <DefaultTableBlock>
        <FollowsTableSsr
          data={data}
          outerView={outerView}
          showSwitchView
          title={t("follows-page:table")}
        />
      </DefaultTableBlock>
    </Page>
  );
};

export default FollowsPage;
