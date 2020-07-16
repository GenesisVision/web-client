import { SocialShare } from "components/conversation/message/message-actions/social-share/social-share";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ISocialShareContainerProps {}

const _ReportContainer: React.FC<ISocialShareContainerProps> = () => {
  const [t] = useTranslation();

  return (
    <>
      <DialogTop title={t("conversation:social-share.title")} />
      <DialogBottom>
        <SocialShare />
      </DialogBottom>
    </>
  );
};

const SocialShareContainer = React.memo(_ReportContainer);
export default SocialShareContainer;
