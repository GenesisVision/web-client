import React, { createContext, useMemo, useState } from "react";

export interface IPostContextReplyState {
  url: string;
  name: string;
}

export interface IPostContextState {
  replyState?: IPostContextReplyState;
  setReplyState: (state?: IPostContextReplyState) => void;
}

export const PostContextInitialState: IPostContextState = {
  setReplyState: () => {}
};

export const PostContext = createContext<IPostContextState>(
  PostContextInitialState
);

const PostContextProvider: React.FC = ({ children }) => {
  const [replyState, setReplyState] = useState<
    IPostContextReplyState | undefined
  >();

  const value = useMemo(() => ({ replyState, setReplyState }), [
    replyState,
    setReplyState
  ]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
