import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { DialogTop } from "shared/components/dialog/dialog-top";

export interface IFollowTop {
  step: string;
}

const FollowTop: React.FC<IFollowTop & WithTranslation> = ({ t, step }) => (
  <DialogTop title={t(`follow-program.${step}.title`)} />
);

export default translate()(React.memo(FollowTop));
