import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return (
    <ConvertAssetPage
      id={id}
      fromTo={{
        assetFrom: CONVERT_ASSET.ACCOUNT,
        assetTo: CONVERT_ASSET.SIGNAL
      }}
    />
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return { id };
};

interface Props {
  id: string;
}

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
