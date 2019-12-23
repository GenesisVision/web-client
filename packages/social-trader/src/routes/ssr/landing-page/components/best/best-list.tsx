import "./best-list.scss";

import classNames from "classnames";
import * as React from "react";
import BestItem from "routes/ssr/landing-page/components/best/best-item";
import BestLastItem from "routes/ssr/landing-page/components/best/best-last-item";

interface Props {
  className?: string;
}

const _BestList: React.FC<Props> = ({ className }) => (
  <>
    <h2 className="header-center">Our Best</h2>
    <ul className={classNames("best-list", className)}>
      <BestItem
        title="Rodney Green"
        text="Profit from “RefPrllevel"
        url="61b1301c-796f-4f5c-bf37-7540bf72aa7b"
        data="+0.989482929"
      />
      <BestItem
        title="Rodney Green"
        text="Profit from “RefPrllevel"
        url=""
        data="+0.989482929"
      />
      <BestItem
        title="Rodney Green"
        text="Profit from “RefPrllevel"
        url="2ef91289-7a0e-4762-81f6-b6962300fb0d"
        data="+0.989482929"
      />
      <BestItem
        title="Rodney Green"
        text="Profit from “RefPrllevel"
        url="016da29f-ca9d-4797-a5db-22908a80fc7e"
        data="+0.989482929"
      />
      <BestItem
        title="Rodney Green"
        text="Profit from “RefPrllevel"
        url=""
        data="+0.989482929"
      />
      <BestLastItem />
    </ul>
  </>
);

const BestList = React.memo(_BestList);
export default BestList;
