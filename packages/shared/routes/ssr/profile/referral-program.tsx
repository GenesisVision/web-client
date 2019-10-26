import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import ReferralProgramPage from "shared/components/profile/referral-program/referral-program.page";

const Page: React.FC = () => {
  return <ReferralProgramPage />;
};

export const ReferralProgram = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
