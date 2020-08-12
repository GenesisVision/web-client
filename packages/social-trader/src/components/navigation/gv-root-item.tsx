import GVLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { withStyles } from "decorators/withStyles";
import React from "react";
import { HOME_ROUTE } from "routes/app.routes";

const staticStyles = {
  display: "flex",
  "align-items": "center"
};

const _GvRootItem: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <RowItem size={"large"} className={className}>
      <Link className={className} to={HOME_ROUTE}>
        <GVLogo />
      </Link>
    </RowItem>
  );
};

export const GvRootItem = withStyles({ staticStyles })(_GvRootItem);
