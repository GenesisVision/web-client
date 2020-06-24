import { IRePostContainerProps } from "components/conversation/repost/repost.container";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

import styles from "./repost.module.scss";

const RePostContainer = dynamic(() => import("./repost.container"));

export const RePostDialog: React.FC<IRePostDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog className={styles["repost__dialog"]} open={open} onClose={onClose}>
      <RePostContainer {...props} />
    </Dialog>
  );
};

export interface IRePostDialogProps
  extends IDialogOuterProps,
    IRePostContainerProps {}
