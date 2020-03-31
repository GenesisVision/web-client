import classNames from "classnames";
import { Center } from "components/center/center";
import { RePostDialog } from "components/conversation/repost/repost.dialog";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";

import "./share.scss";

export const _Share: React.FC<Props> = ({ count, id, disable, onApply }) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    setIsClose();
    onApply && onApply();
  }, []);

  return (
    <>
      <Center
        onClick={setIsOpen}
        className={classNames("share", {
          "share--disable": disable
        })}
      >
        <RowItem small>Share</RowItem>
        {count > 0 && <RowItem>{count}</RowItem>}
      </Center>
      <RePostDialog
        open={isOpen}
        onClose={setIsClose}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

interface Props {
  count: number;
  id: string;
  onApply: VoidFunction;
  disable?: boolean;
}

export const Share = React.memo(_Share);
