import "./programs-list.scss";

import classNames from "classnames";
import { ProgramDetailsListItem } from "gv-api-web";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import * as React from "react";

import ProgramShort from "./program-short";

interface Props {
  className?: string;
  programs?: ProgramDetailsListItem[];
}

const _ProgramsList: React.FC<Props> = ({ className, programs }) => (
  <ul className={classNames("programs-list", className)}>
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    {/*{programs.map(program => (*/}
    {/*  <ProgramCard title={"Programs"} program={program} />*/}
    {/*))}*/}
  </ul>
);

const ProgramsList = React.memo(_ProgramsList);
export default ProgramsList;
