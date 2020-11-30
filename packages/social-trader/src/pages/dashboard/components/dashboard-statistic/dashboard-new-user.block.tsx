import { Button } from "components/button/button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import React from "react";

import styles from "./dashboard-statistic.module.scss";

const _DashboardNewUserBlock: React.FC<Props> = ({ leftField, rightField }) => {
  return (
    <div className={styles["dashboard-new-user-block"]}>
      <DashboardNewUserBlockField field={leftField} />
      <DashboardNewUserBlockField field={rightField} />
    </div>
  );
};

const DashboardNewUserBlockField: React.FC<{
  field: NewUserFieldType;
}> = React.memo(({ field: { linkLabel, link, text } }) => {
  const { linkCreator } = useToLink();
  return (
    <div className={styles["dashboard-new-user-block__field"]}>
      <div className={styles["dashboard-new-user-block__text"]}>{text}</div>
      <Row className={styles["dashboard-new-user-block__button"]}>
        <Link to={linkCreator(link)}>
          <Button size={"large"} color="primary">
            {linkLabel}
          </Button>
        </Link>
      </Row>
    </div>
  );
});

interface Props {
  leftField: NewUserFieldType;
  rightField: NewUserFieldType;
}

export type NewUserFieldType = {
  linkLabel: string;
  link: string;
  text: string | JSX.Element;
};

export const DashboardNewUserBlock = React.memo(_DashboardNewUserBlock);
