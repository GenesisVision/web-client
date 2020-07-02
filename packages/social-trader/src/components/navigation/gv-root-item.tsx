import GVLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { HOME_ROUTE } from "routes/app.routes";

import styles from "./navigation.module.scss";

export const GvRootItem: React.FC = () => {
  return (
    <RowItem size={"large"} className={styles["gv-root-item"]}>
      <Link className={styles["gv-root-item"]} to={HOME_ROUTE}>
        <GVLogo />
      </Link>
    </RowItem>
  );
};
