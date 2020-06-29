import { getPost } from "components/conversation/conversation.service";
import { ConversationPost } from "components/conversation/conversation.types";
import withDefaultLayout from "decorators/with-default-layout";
import { PostPage } from "pages/posts/post.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props> = ({ post }) => {
  return <PostPage post={post} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const post = await getPost({ id: id as string, token: ctx.token });
  return {
    namespacesRequired: ["form-fields", "conversation"],
    post
  };
};

interface Props {
  post: ConversationPost;
}

export default compose(withDefaultLayout)(Page);
