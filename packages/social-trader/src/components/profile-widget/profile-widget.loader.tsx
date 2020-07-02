import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import * as React from "react";

import styles from "./profile-widget.module.scss";

export const ProfileWidgetLoader: React.FC<{ className?: string }> = React.memo(
  ({ className }) => (
    <Center className={styles["profile-widget__content"]}>
      <RowItem size={"small"}>
        <ProfileAvatar
          className={styles["profile-widget__avatar"]}
          url={""}
          alt={""}
        />
      </RowItem>
      <FilterArrowIcon />
    </Center>
  )
);
