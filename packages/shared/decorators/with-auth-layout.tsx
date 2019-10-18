import { NextPage, NextPageContext } from "next";
import React, { Component } from "react";
import { WithTranslation } from "react-i18next";
import AuthLayout from "shared/components/auth/components/auth-layout/auth-layout";
import { ILoginFooterProps } from "shared/components/auth/components/login-footer/login-footer";

const QUOTES_COUNT = 5;

const withAuthLayout = ({ footerAuthRoute, titleKey, Footer }: IAuthLayout) => (
  WrappedComponent: NextPage<any>
) =>
  class extends Component<{ quoteNo: number } & WithTranslation> {
    static async getInitialProps(ctx: NextPageContext) {
      const quoteNo = Math.floor(Math.random() * QUOTES_COUNT + 1);
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        quoteNo,
        namespacesRequired: ["translation"],
        ...componentProps
      };
    }
    render() {
      return (
        <AuthLayout
          Footer={Footer}
          titleKey={titleKey}
          footerAuthRoute={footerAuthRoute}
          quoteNo={this.props.quoteNo}
        >
          <WrappedComponent {...this.props} />
        </AuthLayout>
      );
    }
  };

export default withAuthLayout;

interface IAuthLayout {
  footerAuthRoute: string;
  titleKey: string;
  Footer: React.ComponentType<ILoginFooterProps>;
}
