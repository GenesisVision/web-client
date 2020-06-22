import ReferralProgramPage from "components/profile/referral-program/referral-program.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <ReferralProgramPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["profile-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
