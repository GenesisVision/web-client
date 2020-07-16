import { IPostEditContainerProps } from "components/conversation/post/post-edit/post-edit.container";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

export interface IPostEditDialogProps
  extends IDialogOuterProps,
    IPostEditContainerProps {}

const PostEditContainer = dynamic(() => import("./post-edit.container"));

export const PostEditDialog: React.FC<IPostEditDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <PostEditContainer {...props} />
    </Dialog>
  );
};
