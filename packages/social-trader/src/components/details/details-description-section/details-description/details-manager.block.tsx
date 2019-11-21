import "./details-description.scss";

import GVButton from "components/gv-button";
import Link, { ToType } from "components/link/link";
import * as React from "react";

const _DetailsManager: React.FC<{
  to: ToType;
  username: string;
}> = ({ to, username }) => {
  return (
    <Link to={to}>
      <GVButton
        variant="text"
        className="asset-details-description__author-btn"
      >
        {username}
      </GVButton>
    </Link>
  );
};

export const DetailsManager = React.memo(_DetailsManager);
