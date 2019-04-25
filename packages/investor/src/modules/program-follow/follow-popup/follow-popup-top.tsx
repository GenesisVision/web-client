import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

export interface IFollowTop {
  programName: string;
  step: string;
}

const FollowTop: React.FC<IFollowTop & InjectedTranslateProps> = ({
  t,
  programName,
  step
}) => (
  <div className="dialog__top">
    <div className="dialog__header">
      <h2>{t(`follow-program.${step}.title`)}</h2>
    </div>
  </div>
);

export default React.memo(translate()(FollowTop));
