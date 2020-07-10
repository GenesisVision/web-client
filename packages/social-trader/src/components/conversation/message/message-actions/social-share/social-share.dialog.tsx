import { ISocialShareContainerProps } from "components/conversation/message/message-actions/social-share/social-share.container";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

export interface IReportDialogProps
  extends IDialogOuterProps,
    ISocialShareContainerProps {}

const SocialShare = dynamic(() => import("./social-share.container"));

export const SocialShareDialog: React.FC<IReportDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <SocialShare {...props} />
    </Dialog>
  );
};
