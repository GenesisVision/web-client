import "./profile-widget.scss";

import classNames from "classnames";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import * as React from "react";

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
