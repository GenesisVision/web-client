import "./funds-list.scss";

import classNames from "classnames";
import { FundDetailsListItem } from "gv-api-web";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import * as React from "react";
import ProgramShort from "routes/ssr/landing-page/components/programs/program-short";

interface Props {
  className?: string;
  funds: FundDetailsListItem[];
}

const _FundsList: React.FC<Props> = ({ className, funds }) => (
  <ul className={classNames("funds-list", className)}>
    {funds.map(fund => (
      <FundCard key={fund.id} fund={fund} />
    ))}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
    {/*<ProgramShort title="Luke Hudson 1" data="1.5k" url="" />*/}
  </ul>
);

const FundsList = React.memo(_FundsList);
export default FundsList;
