import "./details-description.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";

const _DetailsManager: React.FC<{
  to: {
    pathname: string;
    state: string;
  };
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
