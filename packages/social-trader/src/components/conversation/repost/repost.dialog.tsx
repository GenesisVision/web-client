import { IRePostContainerProps } from "components/conversation/repost/repost.container";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

const RePostContainer = dynamic(() => import("./repost.container"));

export interface IRePostDialogProps
  extends IDialogOuterProps,
    IRePostContainerProps {}

export const RePostDialog: React.FC<IRePostDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <RePostContainer {...props} />
    </Dialog>
  );
};
