import ManagerPage from "components/manager/manager.page";
import withDefaultLayout from "decorators/with-default-layout";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props> = ({ profile }) => {
  return <ManagerPage profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const profile = await api.users(ctx.token).getUserProfile(id as string);
  return {
    profile
  };
};

interface Props {
  profile: PublicProfile;
}

export default withDefaultLayout(Page);
