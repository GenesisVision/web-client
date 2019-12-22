import "./programs-list.scss";

import classNames from "classnames";
import { ProgramDetailsListItem } from "gv-api-web";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import * as React from "react";

import ProgramItem from "./program-item";

interface Props {
  className?: string;
  programs: ProgramDetailsListItem[];
}

const _ProgramsList: React.FC<Props> = ({ className, programs }) => (
  <ul className={classNames("programs-list", className)}>
    {programs.map(program => (
      <ProgramCard title={"Programs"} program={program} />
    ))}
    {/*<ProgramItem title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramItem title="Luke Hudson 2" data="1.5k" url="" />*/}
    {/*<ProgramItem title="Luke Hudson 3" data="1.5k" url="" />*/}
    {/*<ProgramItem title="Luke Hudson 4" data="1.5k" url="" />*/}
  </ul>
);

const ProgramsList = React.memo(_ProgramsList);
export default ProgramsList;
