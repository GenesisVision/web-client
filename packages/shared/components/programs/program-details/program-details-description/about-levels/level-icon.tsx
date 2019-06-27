import { LevelInfo } from "gv-api-web";
import * as React from "react";

const LevelIcon: React.FC<Props> = ({ levelInfo }) => {
  return (
    <div
      className={`about-levels__icon about-levels__icon--${levelInfo.level}`}
    >
      {levelInfo.level}
    </div>
  );
};

export default LevelIcon;

interface Props {
  levelInfo: LevelInfo;
}
