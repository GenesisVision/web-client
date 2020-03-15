import "./like.scss";

import classNames from "classnames";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import React, { useCallback } from "react";

export const _Like: React.FC<Props> = ({ count, onClick, disable, liked }) => {
  const clickHandle = useCallback(() => {
    if (!disable) onClick();
  }, [disable, onClick]);

  return (
    <Center
      onClick={clickHandle}
      className={classNames("like", {
        "like--disable": disable
      })}
    >
      <RowItem small>
        <div
          className={classNames("like__icon", {
            "like__icon--liked": liked
          })}
        >
          ♥
        </div>
      </RowItem>
      <RowItem>{count}</RowItem>
    </Center>
  );
};

interface Props {
  count: number;
  onClick: VoidFunction;
  disable?: boolean;
  liked?: boolean;
}

export const Like = React.memo(_Like);
