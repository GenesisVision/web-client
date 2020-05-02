import classNames from "classnames";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import * as React from "react";

import styles from "./profile-widget.module.scss";

export const ProfileWidgetLoader: React.FC<{ className?: string }> = React.memo(
  ({ className }) => (
    <div className={classNames(styles["profile-widget"], className)}>
      <div className={styles["profile-widget__content"]}>
        <ProfileAvatar
          className={styles["profile-widget__avatar"]}
          url={""}
          alt={""}
        />
        <FilterArrowIcon />
      </div>
    </div>
  )
);
