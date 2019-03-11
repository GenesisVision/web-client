import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

export interface IFollowTop {
  programName: string;
  step: string;
}

const FollowTop: React.FunctionComponent<IFollowTop & WithTranslation> = ({
  t,
  programName,
  step
}) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t(`follow-program.${step}.title`)}</h2>
        <p>{programName}</p>
      </div>
    </div>
  );
};

export default withTranslation()(FollowTop);
