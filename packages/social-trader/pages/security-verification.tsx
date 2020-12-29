import withDefaultLayout from "decorators/with-default-layout";
import { NextPage, NextPageContext } from "next";
import EmailConfirmPage from "pages/auth/email-confirm/email-confirm.page";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ userId, code }) => {
  return <div>Security verification</div>;
};
Page.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, code } = getParamsFromCtx(ctx);
  return { namespacesRequired: ["auth"], userId, code };
};
interface Props {
  userId: string;
  code: string;
}

export default withDefaultLayout(Page);
