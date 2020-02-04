import withDefaultLayout from "decorators/with-default-layout";
import { NextPage, NextPageContext } from "next";
import { WalletWithdrawConfirmPage } from "pages/wallet/wallet-withdraw-confirm/wallet-withdraw-confirm.page";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ requestId, code }) => {
  return <WalletWithdrawConfirmPage requestId={requestId} code={code} />;
};
Page.getInitialProps = async (ctx: NextPageContext) => {
  const { requestId, code } = getParamsFromCtx(ctx);
  return { requestId, code };
};
interface Props {
  requestId: string;
  code: string;
}

export default withDefaultLayout(Page);
