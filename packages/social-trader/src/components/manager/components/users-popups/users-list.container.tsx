import { DialogTop } from "components/dialog/dialog-top";
import { UsersList } from "components/manager/components/users-popups/users-list";
import {
  UsersListDataType,
  UsersListItemType
} from "components/manager/components/users-popups/users-popups.types";
import {
  calculateOptions,
  initialOptions
} from "components/notifications/components/notifications.helpers";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { NotificationViewModelItemsViewModel } from "gv-api-web";
import useApiRequest, { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useEffect, useState } from "react";

export interface IUsersListContainerOuterProps {
  onApply?: VoidFunction;
  id: string;
}

export interface IUsersListContainerInnerProps {
  request: (args: {
    id: string;
    take: number;
    count: number;
  }) => Promise<UsersListDataType>;
  title: string;
}

interface Props
  extends IUsersListContainerOuterProps,
    IUsersListContainerInnerProps {}

const _UsersListContainer: React.FC<Props> = ({ id, request, title }) => {
  const [options, setOptions] = useState(initialOptions);
  const [total, setTotal] = useState(0);
  const updateStateMiddleware = (res: NotificationViewModelItemsViewModel) => {
    const newOptions = calculateOptions(options, res.total);
    setOptions(newOptions);
    setTotal(res.total);
  };
  const { data, sendRequest, status } = useApiRequest<UsersListDataType>({
    request,
    fetchOnMount: true,
    fetchOnMountData: { id, ...options },
    middleware: [updateStateMiddleware]
  });
  const [usersList, setUsersList] = useState<UsersListItemType[]>([]);
  useEffect(() => {
    if (data) setUsersList([...usersList, ...data.items]);
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (status !== API_REQUEST_STATUS.PENDING) sendRequest({ id, ...options });
  }, [id, status, options]);

  const hasMore = total > usersList.length;
  return (
    <>
      <DialogTop title={title} />
      <PopoverContentCardBlock size={null} fixed={false}>
        <UsersList
          hasMore={hasMore}
          loadMode={handleLoadMore}
          data={usersList}
        />
      </PopoverContentCardBlock>
    </>
  );
};

const UsersListContainer = React.memo(_UsersListContainer);
export default UsersListContainer;
