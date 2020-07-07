import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { getBrokerFromContext } from "pages/attach-account/attach-account.helpers";
import AttachAccountPage from "pages/attach-account/attach-account.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ requestBrokerName }) => {
  return <AttachAccountPage requestBrokerName={requestBrokerName} />;
};

Page.getInitialProps = async ctx => {
  const requestBrokerName = getBrokerFromContext(ctx);
  return {
    namespacesRequired: ["asset-settings", "attach-account-page"],
    requestBrokerName
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);

interface Props {
  requestBrokerName: string;
  minimumDepositAmount: number;
}
