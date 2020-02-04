import KYCPage from "components/profile/kyc/kyc.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <KYCPage />;
};

export const Verify = compose(withDefaultLayout, withPrivateRoute)(Page);
