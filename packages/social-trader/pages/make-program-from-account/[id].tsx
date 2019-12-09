import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchAccountDescriptionCtx } from "pages/accounts/account-details/services/account-details.service";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id, broker }) => {
  return (
    <ConvertAssetPage
      id={id}
      broker={broker}
      fromTo={{
        assetFrom: CONVERT_ASSET.ACCOUNT,
        assetTo: CONVERT_ASSET.PROGRAM
      }}
    />
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  let broker;
  await fetchAccountDescriptionCtx(id as string, ctx).then(
    ({ brokerDetails }) => {
      broker = brokerDetails.type;
    }
  );
  return { id, broker };
};

interface Props {
  id: string;
  broker: string;
}

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
