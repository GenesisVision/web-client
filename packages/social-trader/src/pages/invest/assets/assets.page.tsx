import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import Page from "components/page/page";
import { useTranslation } from "i18n";
import React, { useMemo } from "react";
import { GV_ASSETS_ROUTE, INVEST_ROUTE } from "routes/invest.routes";
import { ORGANIZATION_SCHEMA } from "utils/seo";
import {
  assetsCoinsSelector,
  assetsCoinsTableSelector,
  assetsHistorySelector,
  assetsHistoryTableSelector,
  assetsPortfolioSelector,
  assetsPortfolioTableSelector
} from "pages/invest/assets/reducers/assets-tables.reducer";
import {
  getAssetsCoins,
  getAssetsHistory,
  getAssetsPortfolio
} from "pages/invest/assets/service/assets.service";
import AssetsTradesSection from "pages/invest/assets/assets-table-section/assets-tables-section";

const AssetsPage = () => {
  const { t } = useTranslation();
  const title = t("assets-page:title");
  const description = t("assets-page:description");
  const tablesData = useMemo(
    () => ({
      assetsCoins: {
        itemSelector: assetsCoinsSelector,
        dataSelector: assetsCoinsTableSelector,
        getItems: getAssetsCoins
      },
      portfolio: {
        itemSelector: assetsPortfolioSelector,
        dataSelector: assetsPortfolioTableSelector,
        getItems: getAssetsPortfolio
      },
      history: {
        itemSelector: assetsHistorySelector,
        dataSelector: assetsHistoryTableSelector,
        getItems: getAssetsHistory
      }
    }),
    []
  );
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
      <AssetsTradesSection tablesData={tablesData} />
    </Page>
  );
};

export default AssetsPage;
