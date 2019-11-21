import withDefaultLayout from "decorators/with-default-layout";
import { ProgramDetailsFull } from "gv-api-web";
import { statisticCurrencyAction } from "pages/programs/program-details/actions/program-details.actions";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

export const programDetailsCreator = (Component: React.ComponentType) => {
  const Page: NextPageWithRedux<{}> = () => {
    return <Component />;
  };

  Page.getInitialProps = async ctx => {
    const { id } = ctx.query;
    await Promise.all([
      ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
      ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
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

  return compose(withDefaultLayout)(Page);
};
