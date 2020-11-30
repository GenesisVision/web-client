import { ConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { PostList } from "components/conversation/post-list/post-list";
import {
  initialOptions,
  SkipTake,
  TAKE_COUNT
} from "components/notifications/components/notifications.helpers";
import { PostItemsViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

export interface IPostListContainerInitData {
  initData?: PostItemsViewModel;
}

export interface IPostListContainerProps extends IPostListContainerInitData {
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
  initData,
  reset,
  id,
  fetchMethod
}) => {
  const [isUpdatingPage, updatePage, setNotUpdatingPage] = useIsOpen();
  const [options, setOptions] = useState(initialOptions);
  const { data, sendRequest, status } = useApiRequest({
    defaultData: initData,
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
      if (newOptions.take) setOptions(newOptions);
      setNotUpdatingPage();
    }
  }, [isUpdatingPage, options]);

  const handleScroll = useCallback(() => {
    updatePage();
  }, []);

  const hasMore = data ? data.total > options.skip : false;
  const canLoadMore = hasMore && status !== "PENDING";

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
