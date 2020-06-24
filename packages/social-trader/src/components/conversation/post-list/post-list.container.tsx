import { ConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { PostList } from "components/conversation/post-list/post-list";
import {
  initialOptions,
  SkipTake,
  TAKE_COUNT
} from "components/notifications/components/notifications.helpers";
import useApiRequest, { API_REQUEST_STATUS } from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

export interface IPostListContainerProps {
  reset?: boolean;
  fetchMethod: (values: Object) => Promise<any>;
  id?: string;
}

export const calculateOptions = (
  options?: SkipTake,
  total: number = 0
): SkipTake => {
  if (!options) return { take: TAKE_COUNT, skip: 0 };
  const { take = 0, skip = 0 } = options;
  const newSkip = skip + take;
  const newTake = Math.max(Math.min(TAKE_COUNT, total - newSkip), 0);
  return { take: newTake, skip: newSkip };
};

const _PostListContainer: React.FC<IPostListContainerProps> = ({
  reset,
  id,
  fetchMethod
}) => {
  const [isUpdatingPage, updatePage, setNotUpdatingPage] = useIsOpen();
  const [options, setOptions] = useState(initialOptions);
  const { data, sendRequest, status } = useApiRequest({
    request: values => fetchMethod(values)
  });

  const updateDebounced = useCallback(
    debounce((options: any, sendRequest: any) => sendRequest(options), 300),
    []
  );

  useEffect(() => {
    if (options.take === 0) return;
    updateDebounced(options, sendRequest);
  }, [id, options, fetchMethod]);

  useEffect(() => {
    if (reset) setOptions({ ...initialOptions });
  }, [reset]);

  useEffect(() => {
    if (isUpdatingPage) {
      const newOptions = calculateOptions(options, data.total);
      setOptions(newOptions);
      setNotUpdatingPage();
    }
  }, [isUpdatingPage, options]);

  const handleScroll = useCallback(() => {
    updatePage();
  }, []);

  const hasMore = data ? data.total > options.skip : false;
  const canLoadMore = hasMore && status !== API_REQUEST_STATUS.PENDING;

  return (
    <PostList
      skip={options.skip}
      hasMore={canLoadMore}
      loaderData={ConversationPostListLoaderData}
      data={data!?.items}
      onScroll={handleScroll}
    />
  );
};

export const PostListContainer = React.memo(_PostListContainer);
