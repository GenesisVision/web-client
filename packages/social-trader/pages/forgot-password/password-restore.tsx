import PasswordRestorePage from "components/auth/forgot-password/password-restore/password-restore.page";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ userId, code }) => {
  return <PasswordRestorePage userId={userId} code={code} />;
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, code } = getParamsFromCtx(ctx);
  return { userId, code };
};

interface Props {
  userId: string;
  code: string;
}

export default withDefaultLayout(Page);
