import { getPost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { PostPage } from "pages/posts/post.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage<Props> = ({ post }) => {
  return <PostPage post={post} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const post = await getPost({ id: id as string });
  return {
    namespacesRequired: ["conversation"],
    post
  };
};

interface Props {
  post: ConversationPost;
}

export default compose(withDefaultLayout)(Page);
