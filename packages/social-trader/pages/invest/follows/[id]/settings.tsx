import FollowSettingsPage from "pages/follows/follow-settings/follow-settings.page";
import React from "react";
import { compose } from "redux";
import {
  dispatchFollowDescription,
  dispatchFollowId
} from "shared/components/follows/follow-details/services/follow-details.service";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const ProgramSettings: NextPageWithRedux<void> = () => {
  return <FollowSettingsPage />;
};

ProgramSettings.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFollowId(id as string)),
    ctx.reduxStore.dispatch(dispatchFollowDescription(id as string)(ctx))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramSettings);
