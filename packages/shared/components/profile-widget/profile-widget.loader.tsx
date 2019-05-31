import "./profile-widget.scss";

import classNames from "classnames";
import * as React from "react";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";

export const ProfileWidgetLoader: React.FC<{ className?: string }> = React.memo(
  ({ className }) => (
    <div className={classNames("profile-widget", className)}>
      <div className="profile-widget__content">
        <ProfileAvatar className="profile-widget__avatar" url={""} alt={""} />
        <FilterArrowIcon />
      </div>
    </div>
  )
);
