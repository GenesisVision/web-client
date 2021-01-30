import withAuthLayout from "decorators/with-auth-layout";
import withReduxStore from "decorators/with-redux-store";
import { NextPage, NextPageContext } from "next";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import SecurityVerificationContainer from "pages/auth/security-verification/security-verification-container";
import React from "react";
import { compose } from "redux";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { initializeStore } from "store";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ code, email }) => {
    return <SecurityVerificationContainer code={code} email={email} />;
};
Page.getInitialProps = async (ctx: NextPageContext) => {
    const { code, email } = getParamsFromCtx(ctx);
    return { namespacesRequired: ["auth"], code, email };
};
interface Props {
    code: string;
    email: string;
}

export default compose(
    withReduxStore(initializeStore),
    withAuthLayout({
        footerAuthRoute: SIGNUP_ROUTE,
        Footer: LoginFooter,
        titleKey: "auth:security-verification.title"
    })
)(Page);
