import { ManagerStatisticItem } from "components/manager/components/manager-statistic-item";
import { FollowersDialog } from "components/manager/components/users-popups/followers.dialog";
import { FollowingDialog } from "components/manager/components/users-popups/following.dialog";
import { ProfilePublicShort } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  items: ProfilePublicShort[];
}

export const FollowersCountItem: React.FC<Props> = React.memo(({ items }) => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <ManagerStatisticItem
        onClick={setOpen}
        label={t("manager-page.followers")}
        value={items.length}
      />
      <FollowersDialog onClose={setClose} open={isOpen} items={items} />
    </>
  );
});

export const FollowingCountItem: React.FC<Props> = React.memo(({ items }) => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <ManagerStatisticItem
        onClick={setOpen}
        label={t("manager-page.following")}
        value={items.length}
      />
      <FollowingDialog onClose={setClose} open={isOpen} items={items} />
    </>
  );
});
