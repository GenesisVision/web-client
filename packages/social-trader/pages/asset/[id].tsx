import ActivePage from "components/active/active.page";
import { fetchActive } from "components/active/service/active.service";
import { setLastModifiedHeader } from "components/assets/asset.helpers";
import withDefaultLayout from "decorators/with-default-layout";
import { AssetInfo } from "gv-api-web";
import { NextPage } from "next";
import React from "react";

const Page: NextPage<Props> = ({ data }) => {
  return <ActivePage data={data} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const data = await fetchActive({ active: id as string });

  setLastModifiedHeader(ctx, data.lastModified);

  return {
    data
  };
};

interface Props {
  data: AssetInfo;
}

export default withDefaultLayout(Page);
