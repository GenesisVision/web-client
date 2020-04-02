import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { TagsPage } from "pages/tags/tags.page";
import React from "react";

const Page: NextPage<Props> = ({ tags }) => {
  return <TagsPage hashTags={tags} />;
};

Page.getInitialProps = async ctx => {
  const { tags } = ctx.query;
  return {
    tags: tags as string[]
  };
};

interface Props {
  tags: string[];
}

export default withDefaultLayout(Page);
