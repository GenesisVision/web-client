import { getHeader } from "components/header/services/header.service";
import { NextPage } from "next";
import React, { Component } from "react";
import { NextPageWithReduxContext } from "utils/types";

const withBetaTesting = (WrappedComponent: NextPage<any>): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      const { isBetaTester } = await getHeader(ctx.token);
      if (!isBetaTester) {
        throw { code: "InternalServerError" };
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        // @ts-ignore
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withBetaTesting;
