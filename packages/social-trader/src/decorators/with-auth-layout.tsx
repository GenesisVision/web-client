import { NextPage, NextPageContext } from "next";
import AuthLayout from "pages/auth/components/auth-layout/auth-layout";
import { ILoginFooterProps } from "pages/auth/components/login-footer/login-footer";
import React, { Component } from "react";
import { WithTranslation } from "react-i18next";

const QUOTES_COUNT = 14;

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
