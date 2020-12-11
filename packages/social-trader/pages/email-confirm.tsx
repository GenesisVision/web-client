import withDefaultLayout from "decorators/with-default-layout";
import EmailConfirmPage from "pages/auth/email-confirm/email-confirm.page";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";
import { NextPageWithRedux } from "utils/types";

interface Props {
  userId: string;
  code: string;
}

const Page: NextPageWithRedux<Props> = ({ userId, code }) => {
  return <EmailConfirmPage userId={userId} code={code} />;
};

Page.getInitialProps = async ctx => {
  const { userId, code } = getParamsFromCtx(ctx);
  return {
    namespacesRequired: ["auth"],
    userId: userId as string,
    code: code as string
  };
};

export default withDefaultLayout(Page);
