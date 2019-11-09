import AttachAccountPage from "pages/attach-account/attach-account.page";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<Props, {}> = ({}) => {
  return <AttachAccountPage />;
};

Page.getInitialProps = async ctx => {
  return {};
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);

interface Props {
  minimumDepositAmount: number;
}
