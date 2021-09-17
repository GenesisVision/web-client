import withDefaultLayout from "decorators/with-default-layout";
import { getFiltersFromContext } from "modules/programs-table/services/programs-table.service";
import React from "react";
import { NextPageWithRedux } from "utils/types";
import { fetchCoins } from "modules/assets-table/services/assets-table.service";
import { CoinsAssetItemsViewModel } from "gv-api-web";
import AssetsPage from "pages/invest/assets/assets.page";

interface Props {
  data: CoinsAssetItemsViewModel;
}

const Page: NextPageWithRedux<Props> = ({ data }) => {
  return <AssetsPage data={data} />;
};

Page.getInitialProps = async ctx => {
  const filtering = getFiltersFromContext(ctx);
  let data;
  try {
    data = await fetchCoins(filtering);
  } catch (e) {
    data = { items: [], total: 0 };
    console.error(e);
  }
  return {
    namespacesRequired: ["assets-page"],
    data
  };
};

export default withDefaultLayout(Page);
