import { ProgramDetailsFull } from "gv-api-web";
import { statisticCurrencyAction } from "pages/follows/follow-details/actions/follow-details.actions";
import FollowDetailsPage from "pages/follows/follow-details/follow-details.page";
import {
  dispatchFollowDescription,
  dispatchFollowId
} from "pages/follows/follow-details/services/follow-details.service";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <FollowDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFollowId(id as string)),
    ctx.reduxStore.dispatch(dispatchFollowDescription(id as string)(ctx))
  ]).then(([_, descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: ProgramDetailsFull;
    }).value;
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(description.currency))
    );
  });
  return {};
};

export default compose(withDefaultLayout)(Page);
