import { PlatformInfo } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React, { Component } from "react";
import { Dispatch } from "redux";
import platformActions from "shared/actions/platform-actions";
import AppLayout from "shared/components/app-layout/app-layout";
import { NextPageWithReduxContext } from "shared/utils/types";

const withDefaultLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
  }> {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
        await dispatch(platformActions.fetchPlatformSettings());
      });

      return {
        namespacesRequired: ["translation"],
        ...componentProps
      };
    }
    render() {
      return (
        <AppLayout>
          <WrappedComponent {...this.props} />
        </AppLayout>
      );
    }
  };

export default withDefaultLayout;
