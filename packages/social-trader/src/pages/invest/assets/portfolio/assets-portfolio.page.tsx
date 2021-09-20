import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import Page from "components/page/page";
import { CoinsAssetItemsViewModel } from "gv-api-web";
import { useTranslation } from "i18n";
import AssetsPortfolioTableSsr from "modules/assets-table/components/assets-portfolio-table/assets-portfolio-table-ssr";
import React from "react";
import { GV_ASSETS_ROUTE, INVEST_ROUTE } from "routes/invest.routes";
import { ORGANIZATION_SCHEMA } from "utils/seo";
import AssetsTabs, { ASSETS_TABS } from "pages/invest/assets/portfolio/components/assets-tabs";

interface Props {
  data: CoinsAssetItemsViewModel;
}

const AssetsPortfolioPage: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const title = t("assets-page:title");
  const description = t("assets-page:description");

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
          { href: GV_ASSETS_ROUTE, label: t("navigation.assets") }
        ]}
      />
      <AssetsTabs initialTab={ASSETS_TABS.PORTFOLIO} />
      <DefaultTableBlock>
        <AssetsPortfolioTableSsr data={data} />
      </DefaultTableBlock>
    </Page>
  );
};

export default AssetsPortfolioPage;
