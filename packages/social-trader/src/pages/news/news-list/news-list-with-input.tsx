import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useIsOpen from "hooks/is-open.hook";
import {
  INewsListContainerProps,
  NewsListContainer
} from "pages/news/news-list/news-list.container";
import React, { useEffect } from "react";

interface Props extends INewsListContainerProps {
  showInput?: boolean;
}

const _NewsListWithInput: React.FC<Props> = ({
  initData,
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
      {showInput && <PostInputContainer onSuccess={setReset} />}
      <NewsListContainer
        initData={initData}
        reset={isReset}
        id={id}
        fetchMethod={fetchMethod}
      />
    </div>
  );
};

export const NewsListWithInput = React.memo(_NewsListWithInput);
