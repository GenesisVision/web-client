import { getHeader } from "components/header/services/header.service";
import ManagerPage from "components/manager/manager.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";
import { NextPageWithRedux } from "utils/types";

interface Props {
  profile: PublicProfile;
}

const Page: NextPageWithRedux<Props> = ({ profile }) => {
  return <ManagerPage profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const { id } = await getHeader(ctx.token);
  const profile = await api.users(ctx.token).getUserProfile(id as string);
  return {
    namespacesRequired: ["form-fields", "conversation", "manager-page"],
    profile
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
