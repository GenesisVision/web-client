import React from "react";
import { compose } from "redux";
import KYCPage from "shared/components/profile/kyc/kyc.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Verify: React.FC = () => {
  return <KYCPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Verify);
