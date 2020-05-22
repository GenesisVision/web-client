import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";
import { SizesType } from "utils/types";

import "./avatar-with-name.scss";

const _AvatarWithName: React.FC<Props> = ({ size, avatar, name }) => {
  return (
    <Row>
      {avatar && (
        <RowItem small={size === "small"} large={size === "large"}>
          <Row>{avatar}</Row>
        </RowItem>
      )}
      <RowItem className="avatar-with-name__name">{name}</RowItem>
    </Row>
  );
};

interface Props {
  size?: SizesType;
  avatar?: React.ReactNode;
  name: string | JSX.Element | React.ReactNode;
}

export const AvatarWithName = React.memo(_AvatarWithName);
