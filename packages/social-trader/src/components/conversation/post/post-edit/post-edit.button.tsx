import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { TEvent } from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";

import { PostEditDialog } from "./post-edit.dialog";

interface Props {
  clearAnchor: (event?: TEvent) => void;
  label?: string;
  id: string;
  onApply: VoidFunction;
}

export const _PostEditButton: React.FC<Props> = ({
  clearAnchor,
  label = "Edit",
  id,
  onApply
}) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    handleClose();
    onApply && onApply();
  }, []);

  const handleClose = useCallback(() => {
    setIsClose();
    clearAnchor();
  }, []);

  return (
    <>
      <TableCardActionsItem onClick={() => setIsOpen()}>
        {label}
      </TableCardActionsItem>
      <PostEditDialog
        open={isOpen}
        onClose={handleClose}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

export const PostEditButton = React.memo(_PostEditButton);
