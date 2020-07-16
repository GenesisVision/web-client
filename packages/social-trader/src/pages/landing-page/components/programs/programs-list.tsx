import clsx from "clsx";
import { ProgramDetailsListItem } from "gv-api-web";
import LpProgramCard from "pages/landing-page/components/lp-program-card/lp-program-card";
import React from "react";

import ProgramShort from "./program-short";
import styles from "./programs-list.module.scss";

interface Props {
  className?: string;
  programs: ProgramDetailsListItem[];
}

const _ProgramsList: React.FC<Props> = ({ className, programs }) => {
  return (
    <ul className={clsx(styles["programs-list"], className)}>
      {programs.map((program, index) => (
        <li className={styles["programs-list__item"]} key={program.id}>
          <LpProgramCard
            key={program.id}
            program={program}
            className={styles["programs-list__card-bg"]}
          />
          {index > 1 && (
            <ProgramShort
              program={program}
              className={styles["programs-list__card-short"]}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const ProgramsList = React.memo(_ProgramsList);
export default ProgramsList;
