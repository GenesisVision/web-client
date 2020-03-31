import FollowNotificationPage from "components/notifications/follow-settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ id }) => {
  return <FollowNotificationPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const {
    query: { id }
  } = ctx;
  return { id };
};

interface Props {
  id: string;
}

export default compose(withDefaultLayout, withPrivateRoute)(Page);
