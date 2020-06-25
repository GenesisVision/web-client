import {
  IPostListContainerProps,
  PostListContainer
} from "components/conversation/post-list/post-list.container";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import { Row } from "components/row/row";
import useIsOpen from "hooks/is-open.hook";
import React, { useEffect } from "react";

interface Props extends IPostListContainerProps {
  inputPlaceholder?: string;
  showInput?: boolean;
}

const _PostListWithInput: React.FC<Props> = ({
  initData,
  inputPlaceholder,
  showInput,
  id,
  fetchMethod
}) => {
  const [isReset, setReset, setNotReset] = useIsOpen();

  useEffect(() => {
    if (isReset) setNotReset();
  }, [isReset]);

  return (
    <div>
      {showInput && (
        <Row>
          <PostInputContainer
            placeholder={inputPlaceholder}
            userId={id}
            onSuccess={setReset}
          />
        </Row>
      )}
      <Row onlyOffset>
        <PostListContainer
          initData={initData}
          reset={isReset}
          id={id}
          fetchMethod={fetchMethod}
        />
      </Row>
    </div>
  );
};

export const PostListWithInput = React.memo(_PostListWithInput);
