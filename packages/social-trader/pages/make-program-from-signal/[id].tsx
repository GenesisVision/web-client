import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import { fetchFollowDescriptionCtx } from "pages/invest/follows/follow-details/services/follow-details.service";
import React from "react";
import { compose } from "redux";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({
  id,
  broker,
  accountCurrency
}) => {
  return (
    <ConvertAssetPage
      currency={accountCurrency}
      id={id}
      broker={broker}
      fromTo={{
        assetFrom: CONVERT_ASSET.SIGNAL,
        assetTo: CONVERT_ASSET.PROGRAM
      }}
    />
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  let broker;
  let accountCurrency;
  await fetchFollowDescriptionCtx(id as string, ctx).then(
    ({ brokerDetails, tradingAccountInfo: { currency } }) => {
      broker = brokerDetails.type;
      accountCurrency = currency;
    }
  );
  return { id, broker, accountCurrency };
};

interface Props {
  accountCurrency: CurrencyEnum;
  id: string;
  broker: string;
}

export default compose(withDefaultLayout, withPrivateRoute)(Page);
