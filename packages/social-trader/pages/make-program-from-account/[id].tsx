import { ProgramDetailsFull } from "gv-api-web";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import React from "react";
import { compose } from "redux";
import platformActions from "shared/actions/platform-actions";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

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
  let broker = "MetaTrader4";
  /*await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx)),
    ctx.reduxStore.dispatch(
      async dispatch => await dispatch(platformActions.fetchPlatformSettings())
    )
  ]).then(([descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFull;
    }).value;
    /!*if (!description.personalDetails || !description.personalDetails.isOwnAsset)
      throw new Error();*!/
    broker = description.brokerDetails.type;
  });*/
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
