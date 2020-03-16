import "./avatar-with-name.scss";

import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";

const _AvatarWithName: React.FC<Props> = ({ avatar, name }) => {
  return (
    <Row>
      {avatar && (
        <RowItem>
          <Row>{avatar}</Row>
        </RowItem>
      )}
      <RowItem className="avatar-with-name__name">{name}</RowItem>
    </Row>
  );
};

interface Props {
  avatar?: React.ReactNode;
  name: string | JSX.Element;
}

export const AvatarWithName = React.memo(_AvatarWithName);
