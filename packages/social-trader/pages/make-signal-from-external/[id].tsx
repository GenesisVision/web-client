import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return (
    <ConvertAssetPage
      id={id}
      fromTo={{
        assetFrom: CONVERT_ASSET.EXTERNAL_ACCOUNT,
        assetTo: CONVERT_ASSET.SIGNAL
      }}
    />
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return {
    namespacesRequired: [
      "form-fields",
      "asset-settings",
      "create-account",
      "convert-page"
    ],
    id
  };
};

interface Props {
  id: string;
}

export default compose(withDefaultLayout, withPrivateRoute)(Page);
