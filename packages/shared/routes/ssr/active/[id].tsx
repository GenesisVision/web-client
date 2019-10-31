import { NextPage } from "next";
import React from "react";
import ActivePage from "shared/components/active/active.page";
import { fetchActive } from "shared/components/active/service/active.service";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage<Props> = ({ data }) => {
  return <ActivePage data={data} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const data = await fetchActive({ active: id as string });
  return {
    data
  };
};

interface Props {
  data: any;
}

export default withDefaultLayout(Page);
