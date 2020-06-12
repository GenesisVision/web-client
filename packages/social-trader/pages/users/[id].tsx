import ManagerPage from "components/manager/manager.page";
import { getUserProfile } from "components/manager/services/manager.service";
import withDefaultLayout from "decorators/with-default-layout";
import { PublicProfile } from "gv-api-web";
import React from "react";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props> = ({ profile }) => {
  return <ManagerPage profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const profile = await getUserProfile(id as string, ctx.token);
  return {
    profile
  };
};

interface Props {
  profile: PublicProfile;
}

export default withDefaultLayout(Page);
