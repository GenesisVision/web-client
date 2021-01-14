import withDefaultLayout from "decorators/with-default-layout";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ code }) => {
    return <div>Security verification</div>;
};
Page.getInitialProps = async (ctx: NextPageContext) => {
    const { code } = getParamsFromCtx(ctx);
    return { namespacesRequired: ["auth"], code };
};
interface Props {
    code: string;
}

export default withDefaultLayout(Page);
