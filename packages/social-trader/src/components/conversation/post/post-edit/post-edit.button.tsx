import { ShareIcon } from "components/conversation/icons/share.icon";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";

import { PostEditDialog } from "./post-edit.dialog";
import styles from "./post-edit.module.scss";

interface Props {
  id: string;
  onApply: VoidFunction;
}

export const _PostEditButton: React.FC<Props> = ({ id, onApply }) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    setIsClose();
    onApply && onApply();
  }, []);

  return (
    <>
      <div onClick={() => setIsOpen()} className={styles["post-edit__icon"]}>
        <ShareIcon />
      </div>
      <PostEditDialog
        open={isOpen}
        onClose={setIsClose}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

export const PostEditButton = React.memo(_PostEditButton);
