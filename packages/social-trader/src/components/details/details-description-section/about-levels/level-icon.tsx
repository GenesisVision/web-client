import "./about-level-icon.scss";

import classNames from "classnames";
import { LevelInfo } from "gv-api-web";
import * as React from "react";

const LevelIcon: React.FC<Props> = React.memo(({ levelInfo, current }) => (
  <div
    className={classNames(
      "about-levels-icon",
      `about-levels-icon--${levelInfo.level}`,
      {
        "about-levels-icon--current": current
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
