import "./details-description.scss";

import Link, { ToType } from "components/link/link";
import * as React from "react";

const _DetailsSubtitle: React.FC<{
  to?: ToType;
  text: string;
}> = ({ to, text }) => {
  return (
    <div className="asset-details-description__author-btn">
      <Link to={to}>{text}</Link>
    </div>
  );
};

export const DetailsSubtitle = React.memo(_DetailsSubtitle);
