import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";

import styles from "./table.module.scss";

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => {
  const { linkCreator } = useToLink();
  return (
    <RowItem>
      <Link to={linkCreator(route, route)} className={styles["toolbar-button"]}>
        {text}
      </Link>
    </RowItem>
  );
});
