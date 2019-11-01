import classNames from "classnames";
import { LevelInfo } from "gv-api-web";
import * as React from "react";

const LevelIcon: React.FC<Props> = React.memo(({ levelInfo, current }) => (
  <div
    className={classNames(
      "about-levels__icon",
      `about-levels__icon--${levelInfo.level}`,
      {
        "about-levels__icon--current": current
      }
    )}
  >
    {levelInfo.level}
  </div>
));

export default LevelIcon;

interface Props {
  levelInfo: LevelInfo;
  current?: boolean;
}
