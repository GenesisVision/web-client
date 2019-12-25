import "./programs-list.scss";

import classNames from "classnames";
import { ProgramDetailsListItem } from "gv-api-web";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import React from "react";

import ProgramShort from "./program-short";

interface Props {
  className?: string;
  programs: ProgramDetailsListItem[];
}

const _ProgramsList: React.FC<Props> = ({ className, programs }) => {
  return (
    <div className={classNames("programs-list", className)}>
      {programs.map((program, index) => (
        <div className="programs-list__item">
          <ProgramCard
            key={program.id}
            title={program.title}
            program={program}
          />
          {index > 1 && <ProgramShort program={program} />}
        </div>
      ))}
    </div>
  );
};

const ProgramsList = React.memo(_ProgramsList);
export default ProgramsList;
