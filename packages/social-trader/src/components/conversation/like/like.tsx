import { Center } from "components/center/center";
import { LikeButtonIcon } from "components/conversation/like/like-button-icon/like-button-icon";
import { RowItem } from "components/row-item/row-item";
import React, { useCallback } from "react";
import { Clickable } from "utils/types";

import styles from "./like.module.scss";

export const _Like: React.FC<Props> = ({ count, onClick, disable, liked }) => {
  const clickHandle = useCallback(() => {
    if (!disable) onClick();
  }, [disable, onClick]);

  return (
    <Center onClick={clickHandle}>
      <RowItem size={"small"}>
        <div className={styles["like__icon"]}>
          <LikeButtonIcon liked={!!liked} disabled={disable} />
        </div>
      </RowItem>
      {count > 0 && (
        <RowItem className={styles["like__count"]}>{count}</RowItem>
      )}
    </Center>
  );
};

interface Props extends Clickable {
  count: number;
  disable?: boolean;
  liked?: boolean;
}

export const Like = React.memo(_Like);
