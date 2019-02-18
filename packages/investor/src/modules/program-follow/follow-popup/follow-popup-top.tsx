import React from "react";
import { TranslationFunction, translate } from "react-i18next";

export interface IFollowTop {
  t: TranslationFunction;
  programName: string;
  step: string;
}

const FollowTop: React.FC<IFollowTop> = ({ t, programName, step }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t(`follow-program.${step}.title`)}</h2>
        <p>{programName}</p>
      </div>
    </div>
  );
};

export default translate()(FollowTop);
