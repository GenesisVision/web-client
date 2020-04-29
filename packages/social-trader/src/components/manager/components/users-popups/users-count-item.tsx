import { ManagerStatisticItem } from "components/manager/components/manager-statistic-item";
import { FollowersDialog } from "components/manager/components/users-popups/followers.dialog";
import { FollowingDialog } from "components/manager/components/users-popups/following.dialog";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  count: number;
}

export const FollowersCountItem: React.FC<Props> = React.memo(
  ({ id, count }) => {
    const [t] = useTranslation();
    const [isOpen, setOpen, setClose] = useIsOpen();
    return (
      <>
        <ManagerStatisticItem
          onClick={setOpen}
          label={t("manager-page.followers")}
          value={count}
        />
        <FollowersDialog onClose={setClose} open={isOpen} id={id} />
      </>
    );
  }
);

export const FollowingCountItem: React.FC<Props> = React.memo(
  ({ id, count }) => {
    const [t] = useTranslation();
    const [isOpen, setOpen, setClose] = useIsOpen();
    return (
      <>
        <ManagerStatisticItem
          onClick={setOpen}
          label={t("manager-page.following")}
          value={count}
        />
        <FollowingDialog onClose={setClose} open={isOpen} id={id} />
      </>
    );
  }
);
