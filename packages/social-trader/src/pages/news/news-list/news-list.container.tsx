import { initialOptions, SkipTake, TAKE_COUNT } from "components/notifications/components/notifications.helpers";
import { MediaPostItemsViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { NewsList } from "pages/news/news-list/news-list";
import React, { useCallback, useEffect, useState } from "react";
import { postponeFunc } from "utils/hook-form.helpers";

export interface INewsListContainerInitData {
  initData: MediaPostItemsViewModel;
}

export interface INewsListContainerProps extends INewsListContainerInitData {
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

const _NewsListContainer: React.FC<INewsListContainerProps> = ({
  initData,
  reset,
  id,
  fetchMethod
}) => {
  const [isUpdatingPage, updatePage, setNotUpdatingPage] = useIsOpen();
  const [options, setOptions] = useState({ ...initialOptions, skip: 10 });
  const { data, sendRequest, status } = useApiRequest({
    defaultData: initData,
    request: values => fetchMethod(values)
  });
  const hasMore = data ? data.total > options.skip : false;
  const [canLoadMore, setCanLoadMore] = useState(
    hasMore && status !== "PENDING"
  );

  useEffect(() => {
    const changeCanLoadMoreFunc = () =>
      setCanLoadMore(hasMore && status !== "PENDING");
    if (status === "SUCCESS") postponeFunc(changeCanLoadMoreFunc);
    else changeCanLoadMoreFunc();
  }, [hasMore, status]);

  useEffect(() => {
    sendRequest(options);
  }, [id, options]);

  useEffect(() => {
    if (reset) setOptions({ ...initialOptions });
  }, [reset]);

  useEffect(() => {
    if (isUpdatingPage) {
      const newOptions = calculateOptions(options, data!.total);
      setOptions(newOptions);
      setNotUpdatingPage();
    }
  }, [isUpdatingPage, options]);

  const handleScroll = useCallback(() => {
    updatePage();
  }, []);

  const handleUpdateItems = useCallback(() => {
    sendRequest(options);
  }, [options]);

  if (!data) return null;
  return (
    <NewsList
      updateItems={handleUpdateItems}
      skip={options.skip}
      hasMore={canLoadMore}
      data={data.items}
      onScroll={handleScroll}
    />
  );
};

export const NewsListContainer = React.memo(_NewsListContainer);
