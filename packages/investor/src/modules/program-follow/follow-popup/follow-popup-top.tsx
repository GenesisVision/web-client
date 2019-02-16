import React from "react";
import { translate } from "react-i18next";
import { TranslationFunction } from "i18next";

export interface IFollowTop {
  t: TranslationFunction;
  programName: string;
}

const FollowTop: React.FC<IFollowTop> = ({ t, programName }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>Title</h2>
        <p>{programName}</p>
      </div>
    </div>
  );
};

export default translate()(FollowTop);
