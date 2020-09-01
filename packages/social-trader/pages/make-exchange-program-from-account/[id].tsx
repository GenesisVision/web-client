import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchAccountDescriptionCtx } from "pages/accounts/account-details/services/account-details.service";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import ConvertAssetPage from "pages/convert-asset/convert-asset.page";
import React from "react";
import { compose } from "redux";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

interface Props {
  id: string;
  broker: string;
  accountCurrency: CurrencyEnum;
}

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
        assetFrom: CONVERT_ASSET.EXCHANGE_ACCOUNT,
        assetTo: CONVERT_ASSET.PROGRAM
      }}
    />
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  let broker;
  let accountCurrency;
  await fetchAccountDescriptionCtx(id as string, ctx).then(
    ({ brokerDetails, tradingAccountInfo: { currency } }) => {
      broker = brokerDetails.type;
      accountCurrency = currency;
    }
  );
  return {
    namespacesRequired: [
      "form-fields",
      "asset-settings",
      "create-account",
      "convert-page"
    ],
    id,
    broker,
    accountCurrency
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
