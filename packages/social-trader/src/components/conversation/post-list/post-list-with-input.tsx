import {
  IPostListContainerProps,
  PostListContainer
} from "components/conversation/post-list/post-list.container";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useIsOpen from "hooks/is-open.hook";
import { debounce } from "lodash";
import React, { useCallback, useEffect } from "react";

interface Props extends IPostListContainerProps {
  showInput?: boolean;
}

const _PostListWithInput: React.FC<Props> = ({
  showInput,
  id,
  fetchMethod
}) => {
  const [isReset, setReset, setNotReset] = useIsOpen();

  const updateDebounced = useCallback(
    debounce(() => setReset(), 300),
    []
  );

  useEffect(() => {
    updateDebounced();
  }, [fetchMethod]);

  useEffect(() => {
    if (isReset) setNotReset();
  }, [isReset]);

  return (
    <div>
      {showInput && <PostInputContainer onSuccess={setReset} />}
      <PostListContainer reset={isReset} id={id} fetchMethod={fetchMethod} />
    </div>
  );
};

export const PostListWithInput = React.memo(_PostListWithInput);
