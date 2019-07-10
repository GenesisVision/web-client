import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

export interface IFollowTop {
  step: string;
}

const FollowTop: React.FC<IFollowTop & WithTranslation> = ({ t, step }) => (
  <div className="dialog__top">
    <div className="dialog__header">
      <h2>{t(`follow-program.${step}.title`)}</h2>
    </div>
  </div>
);

export default translate()(React.memo(FollowTop));
