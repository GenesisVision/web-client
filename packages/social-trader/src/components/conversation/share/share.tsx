import classNames from "classnames";
import { Center } from "components/center/center";
import React, { useCallback } from "react";

import "./like.scss";

export const _Share: React.FC<Props> = ({ onClick, disable }) => {
  const clickHandle = useCallback(() => {
    if (!disable) onClick();
  }, [disable, onClick]);

  return (
    <Center
      onClick={clickHandle}
      className={classNames("share", {
        "share--disable": disable
      })}
    >
      Share
    </Center>
  );
};

interface Props {
  onClick: VoidFunction;
  disable?: boolean;
}

export const Share = React.memo(_Share);
