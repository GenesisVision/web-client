import "./funds-list.scss";

import classNames from "classnames";
import { FundDetailsListItem } from "gv-api-web";
import * as React from "react";
import ProgramShort from "routes/ssr/landing-page/components/programs/program-short";

interface Props {
  className?: string;
  funds?: FundDetailsListItem[];
}

const _FundsList: React.FC<Props> = ({ className, funds }) => (
  <ul className={classNames("funds-list", className)}>
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
    <ProgramShort title="Luke Hudson 1" data="1.5k" url="" />
  </ul>
);

const FundsList = React.memo(_FundsList);
export default FundsList;
