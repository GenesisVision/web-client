import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { useTranslation } from "react-i18next";

export interface IFollowTop {
  step: string;
}

const _FollowTop: React.FC<IFollowTop> = ({ step }) => {
  const [t] = useTranslation();
  return <DialogTop title={t(`follow-program.${step}.title`)} />;
};

const FollowTop = React.memo(_FollowTop);
export default FollowTop;
