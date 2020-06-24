import { getHeader } from "components/header/services/header.service";
import { BetaTestingType } from "gv-api-web";
import { NextPage } from "next";
import React, { Component } from "react";
import { isBetaTesterByType } from "reducers/header-reducer";
import { NextPageWithReduxContext } from "utils/types";

const withBetaTesting = (type: BetaTestingType) => (
  WrappedComponent: NextPage<any>
): any =>
  class extends Component {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      if (!ctx.token.isExist()) {
        throw { code: "InternalServerError" };
      }
      const { betaTester } = await getHeader(ctx.token);
      const isBetaTester = isBetaTesterByType(type)(betaTester);
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
