import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";

import styles from "./avatar-with-name.module.scss";

const _AvatarWithName: React.FC<Props> = ({ avatar, name }) => {
  return (
    <Row>
      {avatar && (
        <RowItem>
          <Row>{avatar}</Row>
        </RowItem>
      )}
      <RowItem className={styles["avatar-with-name__name"]}>{name}</RowItem>
    </Row>
  );
};

interface Props {
  avatar?: React.ReactNode;
  name: string | JSX.Element | React.ReactNode;
}

export const AvatarWithName = React.memo(_AvatarWithName);
