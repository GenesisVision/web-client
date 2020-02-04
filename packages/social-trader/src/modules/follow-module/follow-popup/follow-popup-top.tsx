import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

export interface IFollowTop {
  step: string;
}

const _FollowTop: React.FC<IFollowTop & WithTranslation> = ({ t, step }) => (
  <DialogTop title={t(`follow-program.${step}.title`)} />
);

const FollowTop = translate()(React.memo(_FollowTop));
export default FollowTop;
