import React from "react";
import { compose } from "redux";
import ProfileLayout from "shared/components/profile/profile-layout";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import ProfileContainer from "shared/modules/profile/profile-container";
import { NextPageWithRedux } from "shared/utils/types";

const Profile: NextPageWithRedux<{}> = () => {
  return (
    <ProfileLayout route="details">
      <ProfileContainer />
    </ProfileLayout>
  );
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Profile);
