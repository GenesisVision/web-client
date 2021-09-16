import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchPortfolioCoins } from "modules/assets-table/services/assets-table.service";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";
import { CoinsAssetResponseItemsViewModel } from "gv-api-web";
import AssetsPortfolioPage from "pages/invest/assets/portfolio/assets-portfolio.page";

interface Props {
  data: CoinsAssetResponseItemsViewModel;
}

const Page: NextPageWithRedux<Props> = ({ data }) => {
  return <AssetsPortfolioPage data={data} />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  let data;
  try {
    data = await fetchPortfolioCoins(filtering);
  } catch (e) {
    data = { items: [], total: 0 };
    console.error(e);
  }
  return {
    namespacesRequired: ["assets-page"],
    data
  };
};

export default compose(withPrivateRoute, withDefaultLayout)(Page);
