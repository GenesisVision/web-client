import classNames from "classnames";
import { LevelInfo } from "gv-api-web";
import * as React from "react";

import styles from "./about-level-icon.module.scss";

const LevelIcon: React.FC<Props> = React.memo(({ levelInfo, current }) => (
  <div
    className={classNames(
      styles["about-levels-icon"],
      styles[`about-levels-icon--${levelInfo.level}`],
      {
        [styles["about-levels-icon--current"]]: current
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
