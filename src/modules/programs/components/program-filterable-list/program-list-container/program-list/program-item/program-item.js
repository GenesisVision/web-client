import classnames from "classnames";
import React from "react";

import PIStatistic from "./pi-statistic/pi-statistic";
import ProgramItem from "../../../../../../../components/program-item/program-item";
import { PROGRAM_ROUTE } from "../../../../../../program/program.constants";
import replaceParams from "../../../../../../../utils/replace-params";
import "./program-item.css";

const ProgramListItem = props => {
  return <ProgramItem statistic={PIStatistic} {...props} />;
};

export default ProgramListItem;
