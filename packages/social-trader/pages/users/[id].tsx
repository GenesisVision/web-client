import ManagerPage from "components/manager/manager.page";
import { getUserProfile } from "components/manager/services/manager.service";
import withDefaultLayout from "decorators/with-default-layout";
import { PublicProfile } from "gv-api-web";
import { getShowEventsState } from "pages/feed/show-events-container/show-events-cookie-service";
import React from "react";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props> = ({ cookieShowEvents, profile }) => {
  return <ManagerPage cookieShowEvents={cookieShowEvents} profile={profile} />;
};

Page.getInitialProps = async ctx => {
  const cookieShowEvents = getShowEventsState(ctx);
  const { id } = ctx.query;
  const profile = await getUserProfile(id as string, ctx.token);
  return {
    cookieShowEvents,
    namespacesRequired: ["conversation", "manager-page"],
    profile
  };
};

interface Props {
  cookieShowEvents?: boolean;
  profile: PublicProfile;
}

export default withDefaultLayout(Page);
