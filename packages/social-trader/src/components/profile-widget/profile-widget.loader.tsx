import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import * as React from "react";

export const ProfileWidgetLoader: React.FC = React.memo(() => (
  <Center>
    <RowItem size={"small"}>
      <ProfileAvatar url={""} alt={""} />
    </RowItem>
    <FilterArrowIcon />
  </Center>
));
