import { getHeader } from "components/header/services/header.service";
import ManagerPage from "components/manager/manager.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { PublicProfile } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";
import { api, Token } from "services/api-client/swagger-custom-client";

interface Props {
  profile: PublicProfile;
}

const Page: NextPage<Props> = ({ profile }) => {
  return <ManagerPage profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const { id } = await getHeader(Token.create(ctx));
  const profile = await api.users().getManagerProfile(id as string);
  return {
    profile
  };
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
